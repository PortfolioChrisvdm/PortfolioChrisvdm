// src/components/Playlist.js
import React from 'react';
import TrackList from './TrackList';

export default function Playlist({ name, tracks, onRemove, onNameChange, onSave }) {
  const handleNameChange = e => onNameChange(e.target.value);

  return (
    <div className="Playlist">
      <div className="SearchBar">
        <input
          value={name}
          onChange={handleNameChange}
          placeholder="New Playlist"
        />
      </div>
      <TrackList tracks={tracks} onAction={onRemove} actionLabel="Remove" />
      <button className="SaveButton" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}
