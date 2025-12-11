import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineClock, HiOutlineDotsVertical } from 'react-icons/hi';
import { MdPlaylistAdd, MdShare, MdOutlineWatchLater } from 'react-icons/md';
import { formatViews, formatDuration, formatRelativeTime } from '../../utils/helpers';
import { addToWatchLater, removeFromWatchLater, selectIsInWatchLater } from '../../store/slices/watchLaterSlice';
import { useClickOutside } from '../../hooks/useClickOutside';

const VideoCard = ({ video, layout = 'grid' }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // eslint-disable-line no-unused-vars
  const isInWatchLater = useSelector(selectIsInWatchLater(video.id));
  const menuRef = useClickOutside(() => setShowMenu(false));
  const hoverTimeoutRef = useRef(null);

  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWatchLater) {
      dispatch(removeFromWatchLater(video.id));
    } else {
      dispatch(addToWatchLater(video));
    }
    setShowMenu(false);
  };

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  if (layout === 'list') {
    return (
      <Link
        to={`/watch/${video.id}`}
        className="flex gap-4 group"
      >
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-40 sm:w-64 aspect-video rounded-xl overflow-hidden bg-youtube-gray-200 dark:bg-youtube-gray-800">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="duration-badge">
            {formatDuration(video.duration)}
          </span>

          {/* Watch later button on hover */}
          <button
            onClick={handleWatchLater}
            className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MdOutlineWatchLater className={`w-5 h-5 ${isInWatchLater ? 'text-youtube-red' : 'text-white'}`} />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium line-clamp-2 mb-1">
            {video.title}
          </h3>
          <div className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400">
            <p>{formatViews(video.views)} • {formatRelativeTime(video.uploadDate)}</p>
          </div>
          <Link
            to={`/channel/${video.channelId}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 mt-2 text-sm text-youtube-gray-600 dark:text-youtube-gray-400 hover:text-youtube-gray-900 dark:hover:text-white"
          >
            <img
              src={video.channelAvatar}
              alt={video.channelName}
              className="w-6 h-6 rounded-full"
            />
            <span>{video.channelName}</span>
          </Link>
          <p className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400 line-clamp-2 mt-2 hidden sm:block">
            {video.description}
          </p>
        </div>
      </Link>
    );
  }

  // Grid layout (default)
  return (
    <div
      className="video-card group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/watch/${video.id}`}>
        {/* Thumbnail */}
        <div className="thumbnail-container">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Duration badge */}
          {video.isLive ? (
            <span className="absolute bottom-1 right-1 bg-youtube-red text-white text-xs px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="duration-badge">
              {formatDuration(video.duration)}
            </span>
          )}

          {/* Hover overlay with watch later */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors">
            <button
              onClick={handleWatchLater}
              className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
              title={isInWatchLater ? 'Remove from Watch later' : 'Add to Watch later'}
            >
              <MdOutlineWatchLater className={`w-5 h-5 ${isInWatchLater ? 'text-youtube-red' : 'text-white'}`} />
            </button>
          </div>

          {/* Progress bar for partially watched videos */}
          {video.progress > 0 && video.progress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-youtube-gray-400">
              <div
                className="progress-bar"
                style={{ width: `${video.progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Video info */}
        <div className="flex gap-3 mt-3">
          <Link
            to={`/channel/${video.channelId}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0"
          >
            <img
              src={video.channelAvatar}
              alt={video.channelName}
              className="w-9 h-9 rounded-full hover:opacity-90"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium line-clamp-2 leading-5 mb-1">
              {video.title}
            </h3>
            <Link
              to={`/channel/${video.channelId}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400 hover:text-youtube-gray-900 dark:hover:text-white"
            >
              {video.channelName}
            </Link>
            <p className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400">
              {formatViews(video.views)} • {formatRelativeTime(video.uploadDate)}
            </p>
          </div>

          {/* Menu button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700 transition-all"
            >
              <HiOutlineDotsVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="dropdown-menu">
                <button
                  onClick={handleWatchLater}
                  className="dropdown-item w-full"
                >
                  <HiOutlineClock className="w-5 h-5" />
                  <span>{isInWatchLater ? 'Remove from Watch later' : 'Save to Watch later'}</span>
                </button>
                <button className="dropdown-item w-full">
                  <MdPlaylistAdd className="w-5 h-5" />
                  <span>Save to playlist</span>
                </button>
                <button className="dropdown-item w-full">
                  <MdShare className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
