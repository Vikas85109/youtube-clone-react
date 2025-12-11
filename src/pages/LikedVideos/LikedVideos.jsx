import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiOutlinePlay, HiOutlineSwitchHorizontal, HiOutlineThumbUp } from 'react-icons/hi';
import { VideoGrid } from '../../components';
import {
  selectLikedVideos,
  clearLikedVideos,
} from '../../store/slices/likedVideosSlice';

const LikedVideos = () => {
  const dispatch = useDispatch();
  const likedVideos = useSelector(selectLikedVideos);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your liked videos?')) {
      dispatch(clearLikedVideos());
    }
  };

  const firstVideo = likedVideos[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Sidebar with playlist info */}
      <div className="lg:w-80 flex-shrink-0">
        <div className="bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-youtube-gray-900 rounded-2xl p-4 sticky top-20">
          {/* Playlist thumbnail */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            {firstVideo ? (
              <img
                src={firstVideo.thumbnail}
                alt="Liked Videos"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-200 dark:bg-blue-900/50 flex items-center justify-center">
                <HiOutlineThumbUp className="w-16 h-16 text-blue-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium">
                {likedVideos.length} videos
              </span>
            </div>
          </div>

          {/* Playlist info */}
          <h1 className="text-2xl font-bold mb-2">Liked videos</h1>
          <p className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400 mb-2">
            Private playlist
          </p>
          <p className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400 mb-4">
            {likedVideos.length} videos
          </p>

          {/* Actions */}
          {likedVideos.length > 0 && (
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
        {likedVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-youtube-gray-500">
            <HiOutlineThumbUp className="w-24 h-24 mb-4" />
            <p className="text-lg font-medium">No liked videos</p>
            <p className="text-sm">Videos you like will appear here</p>
          </div>
        ) : (
          <VideoGrid videos={likedVideos} layout="list" />
        )}
      </div>
    </div>
  );
};

export default LikedVideos;
