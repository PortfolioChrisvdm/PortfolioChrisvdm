// src/components/Track.js
import React from 'react';

export default function Track({ track, onAction, actionLabel }) {
  const handleClick = () => onAction(track);
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      <button className="Track-action" onClick={handleClick}>
        {actionLabel}
      </button>
    </div>
  );
}
