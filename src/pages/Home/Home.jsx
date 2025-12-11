import React, { useState, useCallback } from 'react';
import { CategoryBar, VideoGrid } from '../../components';
import { useInfiniteVideos } from '../../hooks/useVideos';
import { useInfiniteScroll } from '../../hooks/useIntersectionObserver';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteVideos(selectedCategory);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const loadMoreRef = useInfiniteScroll(handleLoadMore);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Flatten all pages of videos into a single array
  const videos = data?.pages.flatMap((page) => page.videos) || [];

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-youtube-gray-500">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-lg font-medium">Something went wrong</p>
        <p className="text-sm">Please try again later</p>
      </div>
    );
  }

  return (
    <div>
      {/* Category filter bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Video grid */}
      <div className="p-4">
        <VideoGrid
          videos={videos}
          isLoading={isLoading}
          layout="grid"
          skeletonCount={12}
        />

        {/* Load more trigger */}
        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="flex justify-center py-8"
          >
            {isFetchingNextPage && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-youtube-red border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-youtube-gray-500">Loading more...</span>
              </div>
            )}
          </div>
        )}

        {/* End of results */}
        {!hasNextPage && videos.length > 0 && (
          <p className="text-center text-youtube-gray-500 py-8">
            You've reached the end
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
