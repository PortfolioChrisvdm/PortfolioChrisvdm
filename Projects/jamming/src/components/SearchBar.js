// src/components/SearchBar.js
import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const handleChange = e => setTerm(e.target.value);
  const search = () => onSearch(term);

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter a song, artist, or album"
        value={term}
        onChange={handleChange}
      />
      <button onClick={search}>SEARCH</button>
    </div>
  );
}
