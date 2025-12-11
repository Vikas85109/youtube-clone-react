import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('youtube-theme');
    return savedTheme || 'light';
  });

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Watch Later
  const [watchLater, setWatchLater] = useState(() => {
    const saved = localStorage.getItem('youtube-watchlater');
    return saved ? JSON.parse(saved) : [];
  });

  // Liked Videos
  const [likedVideos, setLikedVideos] = useState(() => {
    const saved = localStorage.getItem('youtube-liked');
    return saved ? JSON.parse(saved) : [];
  });

  // Disliked Videos
  const [dislikedVideos, setDislikedVideos] = useState(() => {
    const saved = localStorage.getItem('youtube-disliked');
    return saved ? JSON.parse(saved) : [];
  });

  // Watch History
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('youtube-history');
    return saved ? JSON.parse(saved) : [];
  });

  // Subscriptions
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('youtube-subscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('youtube-theme', theme);
  }, [theme]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('youtube-watchlater', JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem('youtube-liked', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem('youtube-disliked', JSON.stringify(dislikedVideos));
  }, [dislikedVideos]);

  useEffect(() => {
    localStorage.setItem('youtube-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('youtube-subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  // Theme toggle
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Sidebar toggle
  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  // Watch Later functions
  const addToWatchLater = (videoId) => {
    setWatchLater(prev => {
      if (prev.includes(videoId)) return prev;
      return [...prev, videoId];
    });
  };

  const removeFromWatchLater = (videoId) => {
    setWatchLater(prev => prev.filter(id => id !== videoId));
  };

  const isInWatchLater = (videoId) => watchLater.includes(videoId);

  // Like/Dislike functions
  const toggleLike = (videoId) => {
    setLikedVideos(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      }
      return [...prev, videoId];
    });
    // Remove from disliked if present
    setDislikedVideos(prev => prev.filter(id => id !== videoId));
  };

  const toggleDislike = (videoId) => {
    setDislikedVideos(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      }
      return [...prev, videoId];
    });
    // Remove from liked if present
    setLikedVideos(prev => prev.filter(id => id !== videoId));
  };

  const isLiked = (videoId) => likedVideos.includes(videoId);
  const isDisliked = (videoId) => dislikedVideos.includes(videoId);

  // History functions
  const addToHistory = (videoId) => {
    setHistory(prev => {
      const filtered = prev.filter(id => id !== videoId);
      return [videoId, ...filtered].slice(0, 100); // Keep last 100 videos
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  // Subscription functions
  const toggleSubscription = (channelId) => {
    setSubscriptions(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      }
      return [...prev, channelId];
    });
  };

  const isSubscribed = (channelId) => subscriptions.includes(channelId);

  const value = {
    theme,
    toggleTheme,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    toggleSidebar,
    watchLater,
    addToWatchLater,
    removeFromWatchLater,
    isInWatchLater,
    likedVideos,
    toggleLike,
    isLiked,
    dislikedVideos,
    toggleDislike,
    isDisliked,
    history,
    addToHistory,
    clearHistory,
    subscriptions,
    toggleSubscription,
    isSubscribed
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
