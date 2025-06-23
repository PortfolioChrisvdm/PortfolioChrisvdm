import React, { useState, useEffect } from 'react';
import '../App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import { Spotify } from '../utils/Spotify';

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        await Spotify.getAccessToken();
        console.log('[App] Spotify auth initialized');
      } catch (err) {
        console.error('[App] Auth error:', err);
        alert('Authentication failed. Please try again.');
      }
    };
    init();
  }, []);

  const addTrack = track => {
    if (!playlistTracks.find(t => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = track => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  const updatePlaylistName = name => {
    setPlaylistName(name);
  };

  const savePlaylist = async () => {
    const uris = playlistTracks.map(t => t.uri);
    try {
      await Spotify.savePlaylist(playlistName, uris);
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      alert('Playlist saved successfully!');
    } catch (err) {
      console.error('[App] Save playlist error:', err);
      alert('Failed to save playlist. Please try again.');
    }
  };

  const search = async term => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
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
            name={playlistName}
            tracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}
