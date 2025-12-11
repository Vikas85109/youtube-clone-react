import React from 'react';

const VideoCardSkeleton = ({ layout = 'grid' }) => {
  if (layout === 'list') {
    return (
      <div className="flex gap-4 animate-pulse">
        {/* Thumbnail skeleton */}
        <div className="flex-shrink-0 w-40 sm:w-64 aspect-video rounded-xl skeleton" />

        {/* Info skeleton */}
        <div className="flex-1">
          <div className="h-4 skeleton rounded w-3/4 mb-2" />
          <div className="h-4 skeleton rounded w-1/2 mb-3" />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full skeleton" />
            <div className="h-3 skeleton rounded w-24" />
          </div>
          <div className="h-3 skeleton rounded w-full hidden sm:block" />
          <div className="h-3 skeleton rounded w-2/3 mt-1 hidden sm:block" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="aspect-video rounded-xl skeleton" />

      {/* Info skeleton */}
      <div className="flex gap-3 mt-3">
        {/* Avatar skeleton */}
        <div className="w-9 h-9 rounded-full skeleton flex-shrink-0" />

        <div className="flex-1">
          {/* Title skeleton */}
          <div className="h-4 skeleton rounded w-full mb-2" />
          <div className="h-4 skeleton rounded w-3/4 mb-2" />
          {/* Channel name skeleton */}
          <div className="h-3 skeleton rounded w-1/2 mb-1" />
          {/* Views skeleton */}
          <div className="h-3 skeleton rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
