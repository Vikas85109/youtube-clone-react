import React, { useState } from 'react';
import { HiOutlineFire } from 'react-icons/hi';
import { MdMusicNote, MdSportsEsports, MdMovie, MdNewspaper } from 'react-icons/md';
import { VideoGrid } from '../../components';
import { useTrendingVideos } from '../../hooks/useVideos';

const categories = [
  { id: 'now', label: 'Now', icon: HiOutlineFire },
  { id: 'music', label: 'Music', icon: MdMusicNote },
  { id: 'gaming', label: 'Gaming', icon: MdSportsEsports },
  { id: 'movies', label: 'Movies', icon: MdMovie },
  { id: 'news', label: 'News', icon: MdNewspaper },
];

const Trending = () => {
  const [activeCategory, setActiveCategory] = useState('now');
  const { data: videos = [], isLoading } = useTrendingVideos();

  // Filter videos based on category
  const filteredVideos = activeCategory === 'now'
    ? videos
    : videos.filter(video => video.category?.toLowerCase() === activeCategory);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-youtube-red rounded-full flex items-center justify-center">
          <HiOutlineFire className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold">Trending</h1>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6 border-b border-youtube-gray-200 dark:border-youtube-gray-800 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-youtube-gray-900 dark:border-white text-youtube-gray-900 dark:text-white'
                  : 'border-transparent text-youtube-gray-600 dark:text-youtube-gray-400 hover:text-youtube-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Videos */}
      <VideoGrid
        videos={filteredVideos}
        isLoading={isLoading}
        layout="list"
        skeletonCount={10}
      />
    </div>
  );
};

export default Trending;
