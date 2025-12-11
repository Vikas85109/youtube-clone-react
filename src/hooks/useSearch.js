import { useQuery } from '@tanstack/react-query';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSearchSuggestions, searchVideos } from '../api/videoApi';
import {
  setSearchQuery,
  setSuggestions,
  setShowSuggestions,
  addRecentSearch,
  selectSearchQuery,
  selectRecentSearches,
  selectShowSuggestions,
} from '../store/slices/searchSlice';
import { debounce } from '../utils/helpers';

// Query keys
export const searchKeys = {
  suggestions: (query) => ['search', 'suggestions', query],
  results: (query) => ['search', 'results', query],
};

// Custom hook for search functionality
export const useSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = useSelector(selectSearchQuery);
  const recentSearches = useSelector(selectRecentSearches);
  const showSuggestions = useSelector(selectShowSuggestions);

  const [localQuery, setLocalQuery] = useState(query);

  // Sync with URL params
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setLocalQuery(urlQuery);
      dispatch(setSearchQuery(urlQuery));
    }
  }, [searchParams, dispatch]);

  // Suggestions query
  const { data: suggestions = [] } = useQuery({
    queryKey: searchKeys.suggestions(localQuery),
    queryFn: () => getSearchSuggestions(localQuery),
    enabled: localQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  // Update suggestions in redux
  useEffect(() => {
    dispatch(setSuggestions(suggestions));
  }, [suggestions, dispatch]);

  // Debounced query update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((value) => {
      dispatch(setSearchQuery(value));
    }, 300),
    [dispatch]
  );

  // Handle input change
  const handleInputChange = useCallback((value) => {
    setLocalQuery(value);
    debouncedSetQuery(value);
    if (value.length >= 2) {
      dispatch(setShowSuggestions(true));
    }
  }, [debouncedSetQuery, dispatch]);

  // Handle search submit
  const handleSearch = useCallback((searchQuery = localQuery) => {
    if (searchQuery.trim()) {
      dispatch(addRecentSearch(searchQuery.trim()));
      dispatch(setShowSuggestions(false));
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, [localQuery, dispatch, navigate]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion) => {
    setLocalQuery(suggestion);
    dispatch(setSearchQuery(suggestion));
    handleSearch(suggestion);
  }, [dispatch, handleSearch]);

  // Clear search
  const clearSearch = useCallback(() => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
    dispatch(setShowSuggestions(false));
  }, [dispatch]);

  // Focus handler
  const handleFocus = useCallback(() => {
    if (localQuery.length >= 2 || recentSearches.length > 0) {
      dispatch(setShowSuggestions(true));
    }
  }, [localQuery, recentSearches, dispatch]);

  // Blur handler
  const handleBlur = useCallback(() => {
    // Delay to allow click on suggestions
    setTimeout(() => {
      dispatch(setShowSuggestions(false));
    }, 200);
  }, [dispatch]);

  return {
    query: localQuery,
    suggestions,
    recentSearches,
    showSuggestions,
    handleInputChange,
    handleSearch,
    handleSuggestionClick,
    clearSearch,
    handleFocus,
    handleBlur,
  };
};

// Search results hook
export const useSearchResults = (query) => {
  return useQuery({
    queryKey: searchKeys.results(query),
    queryFn: () => searchVideos(query),
    enabled: !!query && query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};
