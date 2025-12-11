import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineTrash, HiOutlinePause, HiOutlinePlay } from 'react-icons/hi';
import { VideoGrid } from '../../components';
import {
  selectHistory,
  selectIsHistoryEnabled,
  clearHistory,
  toggleHistoryEnabled,
} from '../../store/slices/historySlice';

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  const isHistoryEnabled = useSelector(selectIsHistoryEnabled);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your watch history?')) {
      dispatch(clearHistory());
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Watch history</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleHistoryEnabled())}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-youtube-gray-100 dark:bg-youtube-gray-800 rounded-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700"
          >
            {isHistoryEnabled ? (
              <>
                <HiOutlinePause className="w-5 h-5" />
                Pause history
              </>
            ) : (
              <>
                <HiOutlinePlay className="w-5 h-5" />
                Resume history
              </>
            )}
          </button>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-youtube-red bg-youtube-gray-100 dark:bg-youtube-gray-800 rounded-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700"
            >
              <HiOutlineTrash className="w-5 h-5" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {!isHistoryEnabled && (
        <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-800 dark:text-yellow-200">
          <p className="text-sm">
            Watch history is paused. New videos won't be added to your history until you resume it.
          </p>
        </div>
      )}

      {history.length === 0 ? (
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
          <p className="text-lg font-medium">No watch history</p>
          <p className="text-sm">Videos you watch will appear here</p>
        </div>
      ) : (
        <VideoGrid videos={history} layout="list" />
      )}
    </div>
  );
};

export default History;
