import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineFilter } from 'react-icons/hi';
import { VideoGrid } from '../../components';
import { useSearchResults } from '../../hooks/useSearch';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: videos = [], isLoading } = useSearchResults(query);

  return (
    <div className="p-4">
      {/* Filter bar */}
      <div className="flex items-center justify-between mb-6 border-b border-youtube-gray-200 dark:border-youtube-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-youtube-gray-700 dark:text-youtube-gray-300 hover:bg-youtube-gray-100 dark:hover:bg-youtube-gray-800 rounded-full">
            <HiOutlineFilter className="w-5 h-5" />
            Filters
          </button>
        </div>
        {videos.length > 0 && (
          <span className="text-sm text-youtube-gray-500">
            About {videos.length} results for "{query}"
          </span>
        )}
      </div>

      {/* Search results */}
      {query ? (
        <>
          {videos.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-youtube-gray-500">
              <svg
                className="w-24 h-24 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm">Try different keywords or remove search filters</p>
            </div>
          ) : (
            <VideoGrid
              videos={videos}
              isLoading={isLoading}
              layout="list"
              skeletonCount={8}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-youtube-gray-500">
          <svg
            className="w-24 h-24 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-lg font-medium">Enter a search term</p>
          <p className="text-sm">Search for videos, channels, and more</p>
        </div>
      )}
    </div>
  );
};

export default Search;
