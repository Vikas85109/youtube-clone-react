import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
import { MainLayout, WatchLayout } from './layouts';
import {
  Home,
  Watch,
  Search,
  Channel,
  History,
  WatchLater,
  LikedVideos,
  Trending,
  NotFound,
} from './pages';
import './index.css';

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Placeholder component for routes not fully implemented
const PlaceholderPage = ({ title, icon }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
    <div className="w-24 h-24 mb-4 text-youtube-gray-400">
      {icon || (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      )}
    </div>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-youtube-gray-500">This feature is coming soon!</p>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Routes with sidebar (Main Layout) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/channel/:channelId" element={<Channel />} />
              <Route path="/history" element={<History />} />
              <Route path="/watch-later" element={<WatchLater />} />
              <Route path="/liked" element={<LikedVideos />} />
              <Route path="/trending" element={<Trending />} />

              {/* Placeholder routes */}
              <Route path="/shorts" element={<PlaceholderPage title="Shorts" />} />
              <Route path="/subscriptions" element={<PlaceholderPage title="Subscriptions" />} />
              <Route path="/library" element={<PlaceholderPage title="Your Library" />} />
              <Route path="/playlists" element={<PlaceholderPage title="Playlists" />} />
              <Route path="/movies" element={<PlaceholderPage title="Movies" />} />
            </Route>

            {/* Routes without sidebar (Watch Layout) */}
            <Route element={<WatchLayout />}>
              <Route path="/watch/:videoId" element={<Watch />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<MainLayout />}>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
