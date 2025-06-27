// src/components/SearchBar.js
import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState(() => sessionStorage.getItem('searchTerm') || '');

  const handleChange = (e) => {
    setTerm(e.target.value);
    sessionStorage.setItem('searchTerm', e.target.value); // optional: keep syncing
  };

  const search = () => {
    onSearch(term);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Enter a song, artist, or album"
        value={term || ''} // 💡 fallback to '' if null/undefined
        onChange={handleChange}
      />
      <button onClick={search}>SEARCH</button>
    </div>
  );
}
