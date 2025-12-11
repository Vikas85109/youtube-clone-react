import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiOutlineThumbUp,
  HiOutlineThumbDown,
  HiOutlineShare,
  HiOutlineDownload,
  HiOutlineDotsHorizontal,
} from 'react-icons/hi';
import { MdVerified, MdOutlineWatchLater } from 'react-icons/md';
import {
  VideoPlayer,
  CommentSection,
  SuggestedVideos,
} from '../../components';
import { useVideo } from '../../hooks/useVideos';
import { useChannel } from '../../hooks/useChannel';
import {
  formatViews,
  formatSubscribers,
  formatDate,
  formatCount,
} from '../../utils/helpers';
import {
  toggleLike,
  toggleDislike,
  selectIsLiked,
  selectIsDisliked,
} from '../../store/slices/likedVideosSlice';
import {
  addToWatchLater,
  removeFromWatchLater,
  selectIsInWatchLater,
} from '../../store/slices/watchLaterSlice';
import {
  subscribe,
  unsubscribe,
  selectIsSubscribed,
} from '../../store/slices/subscriptionsSlice';
import { addToHistory } from '../../store/slices/historySlice';

const Watch = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();

  const { data: video, isLoading: videoLoading } = useVideo(videoId);
  const { data: channel } = useChannel(video?.channelId);

  const isLiked = useSelector(selectIsLiked(videoId));
  const isDisliked = useSelector(selectIsDisliked(videoId));
  const isInWatchLater = useSelector(selectIsInWatchLater(videoId));
  const isSubscribed = useSelector(selectIsSubscribed(video?.channelId));

  const [showFullDescription, setShowFullDescription] = React.useState(false);

  // Add to history when video loads
  useEffect(() => {
    if (video) {
      dispatch(addToHistory(video));
    }
  }, [video, dispatch]);

  const handleLike = () => {
    if (video) {
      dispatch(toggleLike(video));
    }
  };

  const handleDislike = () => {
    if (video) {
      dispatch(toggleDislike(video));
    }
  };

  const handleWatchLater = () => {
    if (video) {
      if (isInWatchLater) {
        dispatch(removeFromWatchLater(videoId));
      } else {
        dispatch(addToWatchLater(video));
      }
    }
  };

  const handleSubscribe = () => {
    if (channel) {
      if (isSubscribed) {
        dispatch(unsubscribe(channel.id));
      } else {
        dispatch(subscribe(channel));
      }
    }
  };

  if (videoLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        <div className="flex-1">
          <div className="aspect-video skeleton rounded-xl mb-4" />
          <div className="h-6 skeleton rounded w-3/4 mb-2" />
          <div className="h-4 skeleton rounded w-1/2 mb-4" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 skeleton rounded-full" />
            <div className="flex-1">
              <div className="h-4 skeleton rounded w-32 mb-1" />
              <div className="h-3 skeleton rounded w-24" />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-lg font-medium">Video not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Main content */}
      <div className="flex-1 max-w-4xl">
        {/* Video player */}
        <VideoPlayer video={video} />

        {/* Video info */}
        <div className="mt-3">
          <h1 className="text-xl font-semibold mb-2">{video.title}</h1>

          {/* Channel info and actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <Link
                to={`/channel/${video.channelId}`}
                className="flex items-center gap-3"
              >
                <img
                  src={video.channelAvatar}
                  alt={video.channelName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{video.channelName}</span>
                    {channel?.isVerified && (
                      <MdVerified className="w-4 h-4 text-youtube-gray-500" />
                    )}
                  </div>
                  <span className="text-sm text-youtube-gray-500">
                    {channel ? formatSubscribers(channel.subscribers) : ''}
                  </span>
                </div>
              </Link>

              <button
                onClick={handleSubscribe}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isSubscribed
                    ? 'bg-youtube-gray-200 dark:bg-youtube-gray-800 text-youtube-gray-900 dark:text-white'
                    : 'bg-youtube-gray-900 dark:bg-white text-white dark:text-youtube-gray-900'
                }`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Like/Dislike */}
              <div className="flex items-center bg-youtube-gray-100 dark:bg-youtube-gray-800 rounded-full">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-l-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700 ${
                    isLiked ? 'text-blue-500' : ''
                  }`}
                >
                  <HiOutlineThumbUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">{formatCount(video.likes)}</span>
                </button>
                <div className="w-px h-6 bg-youtube-gray-300 dark:bg-youtube-gray-600" />
                <button
                  onClick={handleDislike}
                  className={`px-4 py-2 rounded-r-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700 ${
                    isDisliked ? 'text-blue-500' : ''
                  }`}
                >
                  <HiOutlineThumbDown className={`w-5 h-5 ${isDisliked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 px-4 py-2 bg-youtube-gray-100 dark:bg-youtube-gray-800 rounded-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700">
                <HiOutlineShare className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>

              {/* Save */}
              <button
                onClick={handleWatchLater}
                className={`flex items-center gap-2 px-4 py-2 bg-youtube-gray-100 dark:bg-youtube-gray-800 rounded-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700 ${
                  isInWatchLater ? 'text-blue-500' : ''
                }`}
              >
                <MdOutlineWatchLater className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {isInWatchLater ? 'Saved' : 'Save'}
                </span>
              </button>

              {/* Download */}
              <button className="flex items-center gap-2 px-4 py-2 bg-youtube-gray-100 dark:bg-youtube-gray-800 rounded-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700">
                <HiOutlineDownload className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">Download</span>
              </button>

              {/* More */}
              <button className="p-2 bg-youtube-gray-100 dark:bg-youtube-gray-800 rounded-full hover:bg-youtube-gray-200 dark:hover:bg-youtube-gray-700">
                <HiOutlineDotsHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-youtube-gray-100 dark:bg-youtube-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <span>{formatViews(video.views)}</span>
              <span>{formatDate(video.uploadDate)}</span>
              {video.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="text-blue-500">
                  #{tag}
                </span>
              ))}
            </div>
            <p
              className={`text-sm whitespace-pre-wrap ${
                showFullDescription ? '' : 'line-clamp-3'
              }`}
            >
              {video.description}
            </p>
            {video.description?.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-sm font-medium mt-2"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Comments */}
          <CommentSection videoId={videoId} />
        </div>
      </div>

      {/* Suggested videos sidebar */}
      <div className="w-full lg:w-96">
        <SuggestedVideos videoId={videoId} />
      </div>
    </div>
  );
};

export default Watch;
