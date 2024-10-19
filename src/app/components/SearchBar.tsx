'use client'; // This marks it as a client component

import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: string[]; // New prop for suggestions
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null); // Ref for the search bar

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>);
    setShowSuggestions(false); // Hide suggestions after selection
  };

  // Handle clicks outside the search bar
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowSuggestions(false); // Hide suggestions
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative my-4" ref={searchRef}> {/* Attach ref to the container */}
      <input
        type="text"
        placeholder="Search for videos..."
        value={searchTerm}
        onChange={onSearchChange}
        onFocus={handleInputFocus}
        className="p-2 border bg-slate-800 border-slate-800 rounded w-full text-slate-300 font-medium"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-slate-800 rounded mt-1 z-10 text-slate-300 font-semibold"> {/* Added z-10 */}
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-slate-700 cursor-pointer rounded"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
