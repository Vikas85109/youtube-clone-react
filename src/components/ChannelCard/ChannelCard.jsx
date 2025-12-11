import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdVerified } from 'react-icons/md';
import { formatSubscribers } from '../../utils/helpers';
import { subscribe, unsubscribe, selectIsSubscribed } from '../../store/slices/subscriptionsSlice';

const ChannelCard = ({ channel, layout = 'horizontal' }) => {
  const dispatch = useDispatch();
  const isSubscribed = useSelector(selectIsSubscribed(channel.id));

  const handleSubscribe = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubscribed) {
      dispatch(unsubscribe(channel.id));
    } else {
      dispatch(subscribe(channel));
    }
  };

  if (layout === 'vertical') {
    return (
      <Link
        to={`/channel/${channel.id}`}
        className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-youtube-gray-100 dark:hover:bg-youtube-gray-800 transition-colors"
      >
        <img
          src={channel.avatar}
          alt={channel.name}
          className="w-20 h-20 rounded-full mb-3"
        />
        <div className="flex items-center gap-1 mb-1">
          <h3 className="font-medium text-sm">{channel.name}</h3>
          {channel.isVerified && (
            <MdVerified className="w-4 h-4 text-youtube-gray-500" />
          )}
        </div>
        <p className="text-xs text-youtube-gray-500 mb-3">
          {formatSubscribers(channel.subscribers)}
        </p>
        <button
          onClick={handleSubscribe}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            isSubscribed
              ? 'bg-youtube-gray-200 dark:bg-youtube-gray-800 text-youtube-gray-900 dark:text-white hover:bg-youtube-gray-300 dark:hover:bg-youtube-gray-700'
              : 'bg-youtube-gray-900 dark:bg-white text-white dark:text-youtube-gray-900 hover:opacity-90'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </Link>
    );
  }

  return (
    <Link
      to={`/channel/${channel.id}`}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-youtube-gray-100 dark:hover:bg-youtube-gray-800 transition-colors"
    >
      <img
        src={channel.avatar}
        alt={channel.name}
        className="w-16 h-16 rounded-full flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-1">
          <h3 className="font-medium truncate">{channel.name}</h3>
          {channel.isVerified && (
            <MdVerified className="w-4 h-4 text-youtube-gray-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-youtube-gray-500 truncate">
          {channel.handle}
        </p>
        <p className="text-sm text-youtube-gray-500">
          {formatSubscribers(channel.subscribers)}
        </p>
      </div>
      <button
        onClick={handleSubscribe}
        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex-shrink-0 ${
          isSubscribed
            ? 'bg-youtube-gray-200 dark:bg-youtube-gray-800 text-youtube-gray-900 dark:text-white hover:bg-youtube-gray-300 dark:hover:bg-youtube-gray-700'
            : 'bg-youtube-gray-900 dark:bg-white text-white dark:text-youtube-gray-900 hover:opacity-90'
        }`}
      >
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </Link>
  );
};

export default ChannelCard;
