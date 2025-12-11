// Note: api instance is prepared for real backend integration
// import api from './axios';
import { mockVideos, mockChannels, mockComments, mockCategories } from '../data/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Videos API
export const getVideos = async ({ pageParam = 1, category = 'All', limit = 12 }) => {
  await delay(500); // Simulate network delay

  let filteredVideos = [...mockVideos];

  if (category && category !== 'All') {
    filteredVideos = filteredVideos.filter(video => video.category === category);
  }

  const start = (pageParam - 1) * limit;
  const end = start + limit;
  const paginatedVideos = filteredVideos.slice(start, end);

  return {
    videos: paginatedVideos,
    nextPage: end < filteredVideos.length ? pageParam + 1 : undefined,
    totalCount: filteredVideos.length,
  };
};

export const getVideoById = async (videoId) => {
  await delay(300);
  const video = mockVideos.find(v => v.id === videoId);
  if (!video) throw new Error('Video not found');
  return video;
};

export const getRelatedVideos = async (videoId, limit = 20) => {
  await delay(400);
  const currentVideo = mockVideos.find(v => v.id === videoId);
  if (!currentVideo) return [];

  // Get videos from same category, excluding current video
  const related = mockVideos
    .filter(v => v.id !== videoId && v.category === currentVideo.category)
    .slice(0, limit);

  // If not enough, add random videos
  if (related.length < limit) {
    const others = mockVideos
      .filter(v => v.id !== videoId && !related.includes(v))
      .slice(0, limit - related.length);
    related.push(...others);
  }

  return related;
};

export const getTrendingVideos = async (limit = 20) => {
  await delay(400);
  return mockVideos
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

// Search API
export const searchVideos = async (query, limit = 20) => {
  await delay(400);
  const lowerQuery = query.toLowerCase();

  return mockVideos.filter(video =>
    video.title.toLowerCase().includes(lowerQuery) ||
    video.description.toLowerCase().includes(lowerQuery) ||
    video.channelName.toLowerCase().includes(lowerQuery) ||
    video.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  ).slice(0, limit);
};

export const getSearchSuggestions = async (query) => {
  await delay(200);
  const lowerQuery = query.toLowerCase();

  const suggestions = new Set();

  mockVideos.forEach(video => {
    if (video.title.toLowerCase().includes(lowerQuery)) {
      suggestions.add(video.title);
    }
    video.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        suggestions.add(tag);
      }
    });
  });

  return Array.from(suggestions).slice(0, 10);
};

// Channel API
export const getChannelById = async (channelId) => {
  await delay(300);
  const channel = mockChannels.find(c => c.id === channelId);
  if (!channel) throw new Error('Channel not found');
  return channel;
};

export const getChannelVideos = async (channelId, limit = 30) => {
  await delay(400);
  return mockVideos
    .filter(v => v.channelId === channelId)
    .slice(0, limit);
};

// Comments API
export const getComments = async (videoId) => {
  await delay(400);
  return mockComments.filter(c => c.videoId === videoId);
};

export const addComment = async (videoId, comment) => {
  await delay(300);
  const newComment = {
    id: `comment-${Date.now()}`,
    videoId,
    ...comment,
    timestamp: new Date().toISOString(),
    likes: 0,
    replies: [],
  };
  mockComments.push(newComment);
  return newComment;
};

// Categories API
export const getCategories = async () => {
  await delay(200);
  return mockCategories;
};

// Interaction API (simulated)
export const likeVideo = async (videoId) => {
  await delay(200);
  const video = mockVideos.find(v => v.id === videoId);
  if (video) video.likes += 1;
  return { success: true, likes: video?.likes };
};

export const dislikeVideo = async (videoId) => {
  await delay(200);
  const video = mockVideos.find(v => v.id === videoId);
  if (video) video.dislikes += 1;
  return { success: true, dislikes: video?.dislikes };
};

export const subscribeToChannel = async (channelId) => {
  await delay(200);
  const channel = mockChannels.find(c => c.id === channelId);
  if (channel) channel.subscribers += 1;
  return { success: true, subscribers: channel?.subscribers };
};

export const unsubscribeFromChannel = async (channelId) => {
  await delay(200);
  const channel = mockChannels.find(c => c.id === channelId);
  if (channel) channel.subscribers -= 1;
  return { success: true, subscribers: channel?.subscribers };
};
