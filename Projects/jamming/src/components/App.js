import React, { useState, useEffect } from 'react';
import '../App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import { Spotify } from '../utils/Spotify';

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState(() =>
    sessionStorage.getItem('playlistName') || 'New Playlist'
  );
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await Spotify.getAccessToken();
        console.log('[App] Spotify auth initialized');

        const restored = Spotify.restoreState();
        if (restored.term) {
          setSearchResults(
            restored.results.filter(track =>
              !restored.playlistTracks.some(pt => pt.id === track.id)
            )
          );
          setPlaylistName(restored.playlistName || 'New Playlist');
          setPlaylistTracks(restored.playlistTracks || []);
        }
      } catch (err) {
        console.error('[App] Auth error:', err);
        if (err.message.includes('PKCE verifier not found')) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = '/'; // clean restart
        } else {
          alert('Authentication failed. Please try again.');
        }
      }
    };
    init();
  }, []);

  const addTrack = (track) => {
    if (!playlistTracks.find(t => t.id === track.id)) {
      const newList = [...playlistTracks, track];
      setPlaylistTracks(newList);
      sessionStorage.setItem('playlistTracks', JSON.stringify(newList));
    }
  };

  const removeTrack = (track) => {
    const updated = playlistTracks.filter(t => t.id !== track.id);
    setPlaylistTracks(updated);
    sessionStorage.setItem('playlistTracks', JSON.stringify(updated));
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name || ''); // controlled input safeguard
    sessionStorage.setItem('playlistName', name || '');
  };

  const savePlaylist = async () => {
    const uris = playlistTracks.map(t => t.uri);
    if (uris.length === 0) return;

    try {
      setLoading(true);
      await Spotify.savePlaylist(playlistName, uris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      setSearchResults([]);
      alert('Playlist saved successfully!');
    } catch (err) {
      console.error('[App] Save playlist error:', err);
      alert('Failed to save playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const search = async (term) => {
    try {
      const results = await Spotify.search(term);
      const filtered = results.filter(track =>
        !playlistTracks.some(t => t.id === track.id)
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error('[App] Search error:', err);
      alert('Search failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Jam<span className="highlight">mm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults results={searchResults} onAdd={addTrack} />
          <Playlist
            name={playlistName || ''}
            tracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
