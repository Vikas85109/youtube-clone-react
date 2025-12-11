import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  liked: JSON.parse(localStorage.getItem('youtube-liked') || '[]'),
  disliked: JSON.parse(localStorage.getItem('youtube-disliked') || '[]'),
};

const likedVideosSlice = createSlice({
  name: 'likedVideos',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const video = action.payload;
      const isLiked = state.liked.some(v => v.id === video.id);

      if (isLiked) {
        // Remove from liked
        state.liked = state.liked.filter(v => v.id !== video.id);
      } else {
        // Remove from disliked if present
        state.disliked = state.disliked.filter(v => v.id !== video.id);
        // Add to liked
        state.liked.unshift({
          ...video,
          likedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem('youtube-liked', JSON.stringify(state.liked));
      localStorage.setItem('youtube-disliked', JSON.stringify(state.disliked));
    },
    toggleDislike: (state, action) => {
      const video = action.payload;
      const isDisliked = state.disliked.some(v => v.id === video.id);

      if (isDisliked) {
        // Remove from disliked
        state.disliked = state.disliked.filter(v => v.id !== video.id);
      } else {
        // Remove from liked if present
        state.liked = state.liked.filter(v => v.id !== video.id);
        // Add to disliked
        state.disliked.unshift({
          ...video,
          dislikedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem('youtube-liked', JSON.stringify(state.liked));
      localStorage.setItem('youtube-disliked', JSON.stringify(state.disliked));
    },
    clearLikedVideos: (state) => {
      state.liked = [];
      localStorage.removeItem('youtube-liked');
    },
    clearDislikedVideos: (state) => {
      state.disliked = [];
      localStorage.removeItem('youtube-disliked');
    },
  },
});

export const {
  toggleLike,
  toggleDislike,
  clearLikedVideos,
  clearDislikedVideos,
} = likedVideosSlice.actions;

export const selectLikedVideos = (state) => state.likedVideos.liked;
export const selectDislikedVideos = (state) => state.likedVideos.disliked;
export const selectIsLiked = (videoId) => (state) =>
  state.likedVideos.liked.some(v => v.id === videoId);
export const selectIsDisliked = (videoId) => (state) =>
  state.likedVideos.disliked.some(v => v.id === videoId);

export default likedVideosSlice.reducer;
