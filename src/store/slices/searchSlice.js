import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  suggestions: [],
  recentSearches: JSON.parse(localStorage.getItem('youtube-recent-searches') || '[]'),
  isSearching: false,
  showSuggestions: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setShowSuggestions: (state, action) => {
      state.showSuggestions = action.payload;
    },
    addRecentSearch: (state, action) => {
      const query = action.payload;
      // Remove if already exists
      state.recentSearches = state.recentSearches.filter(s => s !== query);
      // Add to beginning
      state.recentSearches.unshift(query);
      // Keep only last 10
      state.recentSearches = state.recentSearches.slice(0, 10);
      localStorage.setItem('youtube-recent-searches', JSON.stringify(state.recentSearches));
    },
    removeRecentSearch: (state, action) => {
      state.recentSearches = state.recentSearches.filter(s => s !== action.payload);
      localStorage.setItem('youtube-recent-searches', JSON.stringify(state.recentSearches));
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      localStorage.removeItem('youtube-recent-searches');
    },
    clearSearch: (state) => {
      state.query = '';
      state.suggestions = [];
      state.showSuggestions = false;
    },
  },
});

export const {
  setSearchQuery,
  setSuggestions,
  setIsSearching,
  setShowSuggestions,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  clearSearch,
} = searchSlice.actions;

export const selectSearchQuery = (state) => state.search.query;
export const selectSuggestions = (state) => state.search.suggestions;
export const selectRecentSearches = (state) => state.search.recentSearches;
export const selectIsSearching = (state) => state.search.isSearching;
export const selectShowSuggestions = (state) => state.search.showSuggestions;

export default searchSlice.reducer;
