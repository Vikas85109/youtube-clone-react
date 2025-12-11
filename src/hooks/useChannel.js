import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getChannelById,
  getChannelVideos,
  subscribeToChannel,
  unsubscribeFromChannel,
} from '../api/videoApi';

// Query keys
export const channelKeys = {
  all: ['channels'],
  details: () => [...channelKeys.all, 'detail'],
  detail: (id) => [...channelKeys.details(), id],
  videos: (id) => [...channelKeys.all, 'videos', id],
};

// Channel details
export const useChannel = (channelId) => {
  return useQuery({
    queryKey: channelKeys.detail(channelId),
    queryFn: () => getChannelById(channelId),
    enabled: !!channelId,
    staleTime: 1000 * 60 * 10,
  });
};

// Channel videos
export const useChannelVideos = (channelId) => {
  return useQuery({
    queryKey: channelKeys.videos(channelId),
    queryFn: () => getChannelVideos(channelId),
    enabled: !!channelId,
    staleTime: 1000 * 60 * 5,
  });
};

// Subscribe mutation
export const useSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscribeToChannel,
    onSuccess: (data, channelId) => {
      queryClient.invalidateQueries({ queryKey: channelKeys.detail(channelId) });
    },
  });
};

// Unsubscribe mutation
export const useUnsubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsubscribeFromChannel,
    onSuccess: (data, channelId) => {
      queryClient.invalidateQueries({ queryKey: channelKeys.detail(channelId) });
    },
  });
};
