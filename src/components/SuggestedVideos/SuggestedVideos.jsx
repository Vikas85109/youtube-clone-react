import React from 'react';
import { Link } from 'react-router-dom';
import { useRelatedVideos } from '../../hooks/useVideos';
import { formatViews, formatDuration, formatRelativeTime } from '../../utils/helpers';

const SuggestedVideoCard = ({ video }) => {
  return (
    <Link
      // to={`/watch/${video.id}`}
      to={`#`}
      className="flex gap-2 group"
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-youtube-gray-200 dark:bg-youtube-gray-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="duration-badge text-[10px]">
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium line-clamp-2 mb-1 group-hover:text-blue-500">
          {video.title}
        </h4>
        <p className="text-xs text-youtube-gray-500 truncate">
          {video.channelName}
        </p>
        <p className="text-xs text-youtube-gray-500">
          {formatViews(video.views)} • {formatRelativeTime(video.uploadDate)}
        </p>
      </div>
    </Link>
  );
};

const SuggestedVideoSkeleton = () => (
  <div className="flex gap-2 animate-pulse">
    <div className="w-40 aspect-video rounded-lg skeleton flex-shrink-0" />
    <div className="flex-1">
      <div className="h-3 skeleton rounded w-full mb-2" />
      <div className="h-3 skeleton rounded w-3/4 mb-2" />
      <div className="h-2 skeleton rounded w-1/2 mb-1" />
      <div className="h-2 skeleton rounded w-1/3" />
    </div>
  </div>
);

const SuggestedVideos = ({ videoId }) => {
  const { data: videos = [], isLoading } = useRelatedVideos(videoId);

  return (
    <div className="space-y-3">
      {isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <SuggestedVideoSkeleton key={i} />
          ))}
        </>
      ) : (
        videos.map((video) => (
          <SuggestedVideoCard key={video.id} video={video} />
        ))
      )}
    </div>
  );
};

export default SuggestedVideos;
