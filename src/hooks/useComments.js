import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments, addComment } from '../api/videoApi';

// Query keys
export const commentKeys = {
  all: ['comments'],
  list: (videoId) => [...commentKeys.all, 'list', videoId],
};

// Get comments for a video
export const useComments = (videoId) => {
  return useQuery({
    queryKey: commentKeys.list(videoId),
    queryFn: () => getComments(videoId),
    enabled: !!videoId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Add comment mutation
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoId, comment }) => addComment(videoId, comment),
    onSuccess: (data, { videoId }) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(videoId) });
    },
  });
};
