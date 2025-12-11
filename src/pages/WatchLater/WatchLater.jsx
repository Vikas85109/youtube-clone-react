import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiOutlinePlay, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { VideoGrid } from '../../components';
import {
  selectWatchLater,
  clearWatchLater,
} from '../../store/slices/watchLaterSlice';
// formatViews can be used for displaying total views
// import { formatViews } from '../../utils/helpers';

const WatchLater = () => {
  const dispatch = useDispatch();
  const watchLater = useSelector(selectWatchLater);

  const totalDuration = watchLater.reduce((acc, video) => acc + (video.duration || 0), 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your Watch Later list?')) {
      dispatch(clearWatchLater());
    }
  };

  const firstVideo = watchLater[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Sidebar with playlist info */}
      <div className="lg:w-80 flex-shrink-0">
        <div className="bg-gradient-to-b from-youtube-gray-200 to-youtube-gray-100 dark:from-youtube-gray-800 dark:to-youtube-gray-900 rounded-2xl p-4 sticky top-20">
          {/* Playlist thumbnail */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            {firstVideo ? (
              <img
                src={firstVideo.thumbnail}
                alt="Watch Later"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-youtube-gray-300 dark:bg-youtube-gray-700 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-youtube-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium">
                {watchLater.length} videos
              </span>
            </div>
          </div>

          {/* Playlist info */}
          <h1 className="text-2xl font-bold mb-2">Watch later</h1>
          <p className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400 mb-2">
            Private playlist
          </p>
          <p className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400 mb-4">
            {watchLater.length} videos • {hours > 0 ? `${hours}h ` : ''}{minutes}m total
          </p>

          {/* Actions */}
          {watchLater.length > 0 && (
            <div className="flex flex-col gap-2">
              <Link
                to={`/watch/${firstVideo?.id}`}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-youtube-gray-800 text-youtube-gray-900 dark:text-white font-medium rounded-full hover:bg-youtube-gray-100 dark:hover:bg-youtube-gray-700"
              >
                <HiOutlinePlay className="w-5 h-5" />
                Play all
              </Link>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-youtube-gray-800 text-youtube-gray-900 dark:text-white font-medium rounded-full hover:bg-youtube-gray-100 dark:hover:bg-youtube-gray-700">
                <HiOutlineSwitchHorizontal className="w-5 h-5" />
                Shuffle
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center justify-center gap-2 px-4 py-2 text-youtube-red font-medium rounded-full hover:bg-youtube-gray-100 dark:hover:bg-youtube-gray-700"
              >
                <HiOutlineTrash className="w-5 h-5" />
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video list */}
      <div className="flex-1">
        {watchLater.length === 0 ? (
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">No videos saved</p>
            <p className="text-sm">Videos you save to watch later will appear here</p>
          </div>
        ) : (
          <VideoGrid videos={watchLater} layout="list" />
        )}
      </div>
    </div>
  );
};

export default WatchLater;
