const clientId = 'eee42f6c6bae4755af12326059bf707c';
const redirectUri = 'http://127.0.0.1:3000/';
const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',
  'user-read-private',
];

let accessToken = '';
let tokenExpiresAt = 0;

function base64urlencode(str) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function generateCodeVerifier() {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let verifier = '';
  const array = new Uint8Array(128);
  window.crypto.getRandomValues(array);
  for (let i = 0; i < array.length; i++) {
    verifier += charset.charAt(array[i] % charset.length);
  }
  return verifier;
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64urlencode(digest);
}

function getStoredState() {
  try {
    const term = sessionStorage.getItem('searchTerm') || '';
    const results = JSON.parse(sessionStorage.getItem('searchResults') || '[]');
    const playlistName = sessionStorage.getItem('playlistName') || 'New Playlist';
    const playlistTracks = JSON.parse(sessionStorage.getItem('playlistTracks') || '[]');
    return { term, results, playlistName, playlistTracks };
  } catch (e) {
    console.warn('[Spotify] Failed to restore state from sessionStorage', e);
    return {};
  }
}

export const Spotify = {
  restoreState: getStoredState,

  async getAccessToken() {
    const now = Date.now();
    if (accessToken && tokenExpiresAt && now < tokenExpiresAt) {
      console.log('[Spotify] Returning valid cached token');
      return accessToken;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      const codeVerifier = generateCodeVerifier();
      localStorage.setItem('spotify_code_verifier', codeVerifier);
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const authUrl =
        `https://accounts.spotify.com/authorize?` +
        `client_id=${clientId}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&code_challenge_method=S256` +
        `&code_challenge=${codeChallenge}`;

      sessionStorage.setItem('searchTerm', params.get('term') || '');
      sessionStorage.setItem('searchResults', sessionStorage.getItem('searchResults') || '[]');
      sessionStorage.setItem('playlistName', sessionStorage.getItem('playlistName') || 'New Playlist');
      sessionStorage.setItem('playlistTracks', sessionStorage.getItem('playlistTracks') || '[]');

      console.log('[Spotify] Redirecting to Spotify auth');
      window.location = authUrl;
      return null;
    }

    const storedVerifier = localStorage.getItem('spotify_code_verifier');
    if (!storedVerifier) throw new Error('PKCE verifier not found');

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: storedVerifier,
      }),
    });

    const json = await tokenResponse.json();
    if (!tokenResponse.ok) {
      console.error('[Spotify] Token exchange failed:', json);
      throw new Error(json.error_description);
    }

    accessToken = json.access_token;
    tokenExpiresAt = Date.now() + json.expires_in * 1000;
    localStorage.removeItem('spotify_code_verifier');
    window.history.replaceState({}, document.title, '/');

    return accessToken;
  },

  async search(term) {
    const token = await this.getAccessToken();
    if (!token) throw new Error('No access token');

    console.log('[Spotify] Searching for:', term);

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error(`[Spotify] Search error (${response.status}):`, text);
      throw new Error(`Spotify search error: ${response.status}`);
    }

    const json = await response.json();
    const items = json.tracks?.items || [];
    sessionStorage.setItem('searchTerm', term);
    sessionStorage.setItem('searchResults', JSON.stringify(items));

    return items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      preview: track.preview_url, // Feature: preview samples
    }));
  },

  async savePlaylist(name, uris) {
    if (!name || uris.length === 0) return;

    const token = await this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
    const user = await userResponse.json();

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name }),
    });

    const playlist = await playlistResponse.json();

    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ uris }),
    });

    sessionStorage.removeItem('playlistName');
    sessionStorage.removeItem('playlistTracks');
    sessionStorage.removeItem('searchResults');
    sessionStorage.removeItem('searchTerm');

    return true;
  },
};
