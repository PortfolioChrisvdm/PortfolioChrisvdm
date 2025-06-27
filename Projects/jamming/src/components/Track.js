import React, { useRef, useState } from 'react';

export default function Track({ track, onAction, actionLabel }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    onAction(track);
  };

  const togglePreview = () => {
    if (!track.preview) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <div className="Track-controls">
        {track.preview && (
          <>
            <button className="PreviewButton" onClick={togglePreview}>
              {isPlaying ? '⏸️ Preview' : '▶️ Preview'}
            </button>
            <audio
              ref={audioRef}
              src={track.preview}
              onEnded={handleEnded}
            />
          </>
        )}
        <button className="Track-action" onClick={handleClick}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
