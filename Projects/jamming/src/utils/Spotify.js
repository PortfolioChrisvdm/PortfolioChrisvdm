const clientId = 'eee42f6c6bae4755af12326059bf707c'; // Your Client ID
const redirectUri = 'http://127.0.0.1:3000/';       // Your redirect URI
const scopes = [
  'playlist-modify-public',
  'playlist-modify-private',
  'user-read-private',  // Needed for /me endpoint
];

let accessToken = '';

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

export const Spotify = {
  async getAccessToken() {
    if (accessToken) {
      console.log('[Spotify] Returning cached access token');
      return accessToken;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      try {
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

        console.log('[Spotify] Redirecting to authorization URL');
        window.location = authUrl;
        return null;
      } catch (err) {
        console.error('[Spotify] Error generating PKCE code challenge:', err);
        throw err;
      }
    }

    const storedVerifier = localStorage.getItem('spotify_code_verifier');
    if (!storedVerifier) {
      const errMsg = '[Spotify] PKCE code_verifier missing from localStorage';
      console.error(errMsg);
      throw new Error(errMsg);
    }

    try {
      console.log('[Spotify] Exchanging code for token with code_verifier:', storedVerifier);

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
        throw new Error(`Token exchange error: ${json.error} – ${json.error_description}`);
      }

      accessToken = json.access_token;
      localStorage.removeItem('spotify_code_verifier');
      window.history.replaceState({}, document.title, '/');

      console.log('[Spotify] Access token acquired');
      return accessToken;
    } catch (err) {
      console.error('[Spotify] Failed to get access token:', err);
      throw err;
    }
  },

  async search(term) {
    try {
      const token = await this.getAccessToken();
      if (!token) throw new Error('No access token');

      console.log(`[Spotify] Searching for term: "${term}"`);

      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error(`[Spotify] Search API error (status ${response.status}):`, text);
        throw new Error(`Spotify search API error: ${response.status}`);
      }

      const json = await response.json();
      return json.tracks?.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      })) || [];
    } catch (err) {
      console.error('[Spotify] Search failed:', err);
      throw err;
    }
  },

  async savePlaylist(name, uris) {
    if (!name || uris.length === 0) {
      console.warn('[Spotify] savePlaylist called with empty name or uris');
      return;
    }

    try {
      const token = await this.getAccessToken();
      if (!token) throw new Error('No access token');

      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

      console.log('[Spotify] Fetching current user profile');
      const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });

      if (!userResponse.ok) {
        const text = await userResponse.text();
        console.error(`[Spotify] Get user profile error (status ${userResponse.status}):`, text);
        throw new Error(`Spotify get user profile error: ${userResponse.status}`);
      }

      const userJson = await userResponse.json();
      const userId = userJson.id;

      console.log(`[Spotify] Creating playlist "${name}" for user ${userId}`);
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name }),
      });

      if (!createPlaylistResponse.ok) {
        const text = await createPlaylistResponse.text();
        console.error(`[Spotify] Create playlist error (status ${createPlaylistResponse.status}):`, text);
        throw new Error(`Spotify create playlist error: ${createPlaylistResponse.status}`);
      }

      const playlistJson = await createPlaylistResponse.json();
      const playlistId = playlistJson.id;

      console.log(`[Spotify] Adding tracks to playlist ${playlistId}`);
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ uris }),
      });

      if (!addTracksResponse.ok) {
        const text = await addTracksResponse.text();
        console.error(`[Spotify] Add tracks error (status ${addTracksResponse.status}):`, text);
        throw new Error(`Spotify add tracks error: ${addTracksResponse.status}`);
      }

      console.log(`[Spotify] Playlist "${name}" saved successfully.`);
    } catch (err) {
      console.error('[Spotify] savePlaylist failed:', err);
      throw err;
    }
  },
};
