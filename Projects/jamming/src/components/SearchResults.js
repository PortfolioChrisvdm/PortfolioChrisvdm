// src/components/SearchResults.js
import React from 'react';
import TrackList from './TrackList';

export default function SearchResults({ results, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={results} onAction={onAdd} actionLabel="Add" />
    </div>
  );
}
