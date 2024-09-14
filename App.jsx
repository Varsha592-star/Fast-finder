import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      // Fetch data based on query
      const fetchResults = async () => {
        try {
          const response = await axios.get('YOUR_API_ENDPOINT', { params: { query } });
          setResults(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a country or capital..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map(result => (
            <li key={result.id}>{result.name} - {result.capital}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

