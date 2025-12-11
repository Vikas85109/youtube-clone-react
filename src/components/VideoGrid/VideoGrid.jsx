import React from 'react';
import VideoCard from '../VideoCard';
import VideoCardSkeleton from '../SkeletonLoader/VideoCardSkeleton';

const VideoGrid = ({ videos, isLoading, layout = 'grid', skeletonCount = 12 }) => {
  if (isLoading) {
    return (
      <div className={layout === 'grid'
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
        : 'flex flex-col gap-4'
      }>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <VideoCardSkeleton key={index} layout={layout} />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
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
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg font-medium">No videos found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={layout === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
      : 'flex flex-col gap-4'
    }>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} layout={layout} />
      ))}
    </div>
  );
};

export default VideoGrid;
