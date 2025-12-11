import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: JSON.parse(localStorage.getItem('youtube-watch-later') || '[]'),
};

const watchLaterSlice = createSlice({
  name: 'watchLater',
  initialState,
  reducers: {
    addToWatchLater: (state, action) => {
      const video = action.payload;
      const exists = state.videos.some(v => v.id === video.id);
      if (!exists) {
        state.videos.unshift({
          ...video,
          addedAt: new Date().toISOString(),
        });
        localStorage.setItem('youtube-watch-later', JSON.stringify(state.videos));
      }
    },
    removeFromWatchLater: (state, action) => {
      state.videos = state.videos.filter(v => v.id !== action.payload);
      localStorage.setItem('youtube-watch-later', JSON.stringify(state.videos));
    },
    clearWatchLater: (state) => {
      state.videos = [];
      localStorage.removeItem('youtube-watch-later');
    },
    reorderWatchLater: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [removed] = state.videos.splice(fromIndex, 1);
      state.videos.splice(toIndex, 0, removed);
      localStorage.setItem('youtube-watch-later', JSON.stringify(state.videos));
    },
  },
});

export const {
  addToWatchLater,
  removeFromWatchLater,
  clearWatchLater,
  reorderWatchLater,
} = watchLaterSlice.actions;

export const selectWatchLater = (state) => state.watchLater.videos;
export const selectIsInWatchLater = (videoId) => (state) =>
  state.watchLater.videos.some(v => v.id === videoId);

export default watchLaterSlice.reducer;
