import React, { useRef } from 'react';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import { FiClock } from 'react-icons/fi';
import { useSearch } from '../../hooks/useSearch';
import { useClickOutside } from '../../hooks/useClickOutside';

const SearchBar = () => {
  const {
    query,
    suggestions,
    recentSearches,
    showSuggestions,
    handleInputChange,
    handleSearch,
    handleSuggestionClick,
    clearSearch,
    handleFocus,
    handleBlur,
  } = useSearch();

  const inputRef = useRef(null);
  const containerRef = useClickOutside(() => handleBlur());

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
    inputRef.current?.blur();
  };

  const displayItems = query.length >= 2 ? suggestions : recentSearches;

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search"
            className="search-input"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-youtube-gray-500 hover:text-youtube-gray-700 dark:hover:text-youtube-gray-300"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="h-10 px-6 bg-youtube-gray-100 dark:bg-youtube-gray-800 border border-l-0 border-youtube-gray-300 dark:border-youtube-gray-700 rounded-r-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700 transition-colors"
        >
          <HiOutlineSearch className="w-5 h-5 text-youtube-gray-600 dark:text-youtube-gray-300" />
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && displayItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-youtube-gray-900 rounded-xl shadow-lg border border-youtube-gray-200 dark:border-youtube-gray-700 py-2 z-50 max-h-96 overflow-y-auto">
          {query.length < 2 && recentSearches.length > 0 && (
            <div className="px-4 py-2 text-xs text-youtube-gray-500 font-medium">
              Recent searches
            </div>
          )}
          {displayItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-youtube-gray-100 dark:hover:bg-youtube-gray-800 transition-colors text-left"
            >
              {query.length < 2 ? (
                <FiClock className="w-4 h-4 text-youtube-gray-500" />
              ) : (
                <HiOutlineSearch className="w-4 h-4 text-youtube-gray-500" />
              )}
              <span className="flex-1 truncate">{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
