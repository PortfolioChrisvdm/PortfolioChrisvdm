// src/components/TrackList.js
import React from 'react';
import Track from './Track';

export default function TrackList({ tracks, onAction, actionLabel }) {
  return (
    <div className="TrackList">
      {tracks.map(track => (
        <Track
          key={track.id}
          track={track}
          onAction={onAction}
          actionLabel={actionLabel}
        />
      ))}
    </div>
  );
}
