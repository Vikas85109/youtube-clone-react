import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdVerified } from 'react-icons/md';
import { HiOutlineBell } from 'react-icons/hi';
import { VideoGrid } from '../../components';
import { useChannel, useChannelVideos } from '../../hooks/useChannel';
import {
  formatSubscribers,
  formatNumber,
} from '../../utils/helpers';
import {
  subscribe,
  unsubscribe,
  selectIsSubscribed,
} from '../../store/slices/subscriptionsSlice';

const tabs = [
  { id: 'videos', label: 'Videos' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'live', label: 'Live' },
  { id: 'playlists', label: 'Playlists' },
  { id: 'community', label: 'Community' },
  { id: 'about', label: 'About' },
];

const Channel = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('videos');

  const { data: channel, isLoading: channelLoading } = useChannel(channelId);
  const { data: videos = [], isLoading: videosLoading } = useChannelVideos(channelId);

  const isSubscribed = useSelector(selectIsSubscribed(channelId));

  const handleSubscribe = () => {
    if (channel) {
      if (isSubscribed) {
        dispatch(unsubscribe(channel.id));
      } else {
        dispatch(subscribe(channel));
      }
    }
  };

  if (channelLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 sm:h-48 skeleton" />
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full skeleton" />
            <div className="flex-1">
              <div className="h-6 skeleton rounded w-48 mb-2" />
              <div className="h-4 skeleton rounded w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-lg font-medium">Channel not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <div
        className="h-32 sm:h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${channel.banner})` }}
      />

      {/* Channel info */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <img
            src={channel.avatar}
            alt={channel.name}
            className="w-20 h-20 sm:w-32 sm:h-32 rounded-full"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{channel.name}</h1>
              {channel.isVerified && (
                <MdVerified className="w-5 h-5 text-youtube-gray-500" />
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-youtube-gray-600 dark:text-youtube-gray-400 mb-2">
              <span>{channel.handle}</span>
              <span>•</span>
              <span>{formatSubscribers(channel.subscribers)}</span>
              <span>•</span>
              <span>{channel.videosCount} videos</span>
            </div>

            <p className="text-sm text-youtube-gray-600 dark:text-youtube-gray-400 line-clamp-2 mb-3">
              {channel.description}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSubscribe}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isSubscribed
                    ? 'bg-youtube-gray-200 dark:bg-youtube-gray-800 text-youtube-gray-900 dark:text-white'
                    : 'bg-youtube-gray-900 dark:bg-white text-white dark:text-youtube-gray-900'
                }`}
              >
                {isSubscribed && <HiOutlineBell className="w-5 h-5" />}
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 border-b border-youtube-gray-200 dark:border-youtube-gray-800 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab whitespace-nowrap ${
                activeTab === tab.id ? 'tab-active' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {activeTab === 'videos' && (
            <VideoGrid
              videos={videos}
              isLoading={videosLoading}
              layout="grid"
              skeletonCount={8}
            />
          )}

          {activeTab === 'about' && (
            <div className="max-w-2xl">
              <h2 className="text-lg font-semibold mb-4">About</h2>
              <p className="text-sm whitespace-pre-wrap mb-6">
                {channel.description}
              </p>

              <h3 className="text-sm font-semibold mb-2">Stats</h3>
              <div className="space-y-2 text-sm text-youtube-gray-600 dark:text-youtube-gray-400">
                <p>Joined {new Date(channel.joinedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</p>
                <p>{formatNumber(channel.totalViews)} views</p>
              </div>
            </div>
          )}

          {['shorts', 'live', 'playlists', 'community'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-16 text-youtube-gray-500">
              <p className="text-lg font-medium">No content available</p>
              <p className="text-sm">This section is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
