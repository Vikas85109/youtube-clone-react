import { createSlice } from '@reduxjs/toolkit';

const MAX_HISTORY_ITEMS = 100;

const initialState = {
  videos: JSON.parse(localStorage.getItem('youtube-history') || '[]'),
  isHistoryEnabled: JSON.parse(localStorage.getItem('youtube-history-enabled') ?? 'true'),
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      if (!state.isHistoryEnabled) return;

      const video = action.payload;
      // Remove if already exists
      state.videos = state.videos.filter(v => v.id !== video.id);
      // Add to beginning with timestamp
      state.videos.unshift({
        ...video,
        watchedAt: new Date().toISOString(),
        progress: video.progress || 0,
      });
      // Keep only last MAX_HISTORY_ITEMS
      state.videos = state.videos.slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem('youtube-history', JSON.stringify(state.videos));
    },
    updateProgress: (state, action) => {
      const { videoId, progress } = action.payload;
      const video = state.videos.find(v => v.id === videoId);
      if (video) {
        video.progress = progress;
        video.watchedAt = new Date().toISOString();
        localStorage.setItem('youtube-history', JSON.stringify(state.videos));
      }
    },
    removeFromHistory: (state, action) => {
      state.videos = state.videos.filter(v => v.id !== action.payload);
      localStorage.setItem('youtube-history', JSON.stringify(state.videos));
    },
    clearHistory: (state) => {
      state.videos = [];
      localStorage.removeItem('youtube-history');
    },
    toggleHistoryEnabled: (state) => {
      state.isHistoryEnabled = !state.isHistoryEnabled;
      localStorage.setItem('youtube-history-enabled', JSON.stringify(state.isHistoryEnabled));
    },
    setHistoryEnabled: (state, action) => {
      state.isHistoryEnabled = action.payload;
      localStorage.setItem('youtube-history-enabled', JSON.stringify(state.isHistoryEnabled));
    },
  },
});

export const {
  addToHistory,
  updateProgress,
  removeFromHistory,
  clearHistory,
  toggleHistoryEnabled,
  setHistoryEnabled,
} = historySlice.actions;

export const selectHistory = (state) => state.history.videos;
export const selectIsHistoryEnabled = (state) => state.history.isHistoryEnabled;
export const selectContinueWatching = (state) =>
  state.history.videos.filter(v => v.progress > 0 && v.progress < 90).slice(0, 10);
export const selectVideoProgress = (videoId) => (state) => {
  const video = state.history.videos.find(v => v.id === videoId);
  return video?.progress || 0;
};

export default historySlice.reducer;
