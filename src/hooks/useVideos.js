import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getVideos,
  getVideoById,
  getRelatedVideos,
  getTrendingVideos,
  searchVideos,
  likeVideo,
  dislikeVideo,
} from '../api/videoApi';

// Query keys
export const videoKeys = {
  all: ['videos'],
  lists: () => [...videoKeys.all, 'list'],
  list: (filters) => [...videoKeys.lists(), filters],
  details: () => [...videoKeys.all, 'detail'],
  detail: (id) => [...videoKeys.details(), id],
  related: (id) => [...videoKeys.all, 'related', id],
  trending: () => [...videoKeys.all, 'trending'],
  search: (query) => [...videoKeys.all, 'search', query],
};

// Infinite query for video feed with pagination
export const useInfiniteVideos = (category = 'All') => {
  return useInfiniteQuery({
    queryKey: videoKeys.list({ category }),
    queryFn: ({ pageParam = 1 }) => getVideos({ pageParam, category }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

// Single video details
export const useVideo = (videoId) => {
  return useQuery({
    queryKey: videoKeys.detail(videoId),
    queryFn: () => getVideoById(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Related videos
export const useRelatedVideos = (videoId) => {
  return useQuery({
    queryKey: videoKeys.related(videoId),
    queryFn: () => getRelatedVideos(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 5,
  });
};

// Trending videos
export const useTrendingVideos = () => {
  return useQuery({
    queryKey: videoKeys.trending(),
    queryFn: getTrendingVideos,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

// Search videos
export const useSearchVideos = (query) => {
  return useQuery({
    queryKey: videoKeys.search(query),
    queryFn: () => searchVideos(query),
    enabled: !!query && query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};

// Like video mutation
export const useLikeVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeVideo,
    onSuccess: (data, videoId) => {
      queryClient.invalidateQueries({ queryKey: videoKeys.detail(videoId) });
    },
  });
};

// Dislike video mutation
export const useDislikeVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dislikeVideo,
    onSuccess: (data, videoId) => {
      queryClient.invalidateQueries({ queryKey: videoKeys.detail(videoId) });
    },
  });
};
