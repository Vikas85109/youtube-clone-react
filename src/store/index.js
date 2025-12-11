import { configureStore } from '@reduxjs/toolkit';
import {
  themeReducer,
  searchReducer,
  watchLaterReducer,
  historyReducer,
  sidebarReducer,
  subscriptionsReducer,
  likedVideosReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    search: searchReducer,
    watchLater: watchLaterReducer,
    history: historyReducer,
    sidebar: sidebarReducer,
    subscriptions: subscriptionsReducer,
    likedVideos: likedVideosReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Initialize theme on load
const initializeTheme = () => {
  const theme = store.getState().theme.mode;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

initializeTheme();

export * from './slices';
