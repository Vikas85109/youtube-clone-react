# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm start          # Start development server on port 3000
npm run build      # Build for production
npm test           # Run tests with Jest
```

## Architecture Overview

This is a YouTube clone built with:
- **React 19** + **React Router DOM 7** for routing
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **TanStack Query v5** for API caching and data fetching
- **Axios** for HTTP requests
- **React Player** for video playback

### State Management

**Redux Toolkit** slices in `src/store/slices/`:
- `themeSlice` - Dark/light mode toggle
- `sidebarSlice` - Sidebar expanded/collapsed state
- `searchSlice` - Search query, suggestions, recent searches
- `watchLaterSlice` - Watch later playlist
- `historySlice` - Watch history (capped at 100 entries)
- `likedVideosSlice` - Liked/disliked videos (mutual exclusivity)
- `subscriptionsSlice` - Channel subscriptions

All user preferences persist to localStorage with `youtube-*` prefixed keys.

### Project Structure

```
src/
├── api/           # Axios instance and API functions
├── components/    # Reusable UI components (Navbar, Sidebar, VideoCard, etc.)
├── hooks/         # Custom hooks (TanStack Query hooks, useSearch, etc.)
├── layouts/       # Layout components (MainLayout, WatchLayout)
├── pages/         # Route-level page components
├── store/         # Redux store and slices
├── data/          # Mock data (mockData.js)
└── utils/         # Utility functions (helpers.js)
```

### Key Custom Hooks

Located in `src/hooks/`:
- `useInfiniteVideos(category)` - Infinite scroll video feed
- `useVideo(videoId)` - Single video details
- `useRelatedVideos(videoId)` - Related videos sidebar
- `useChannel(channelId)` - Channel details
- `useSearch()` - Search functionality with debouncing
- `useComments(videoId)` - Video comments
- `useInfiniteScroll(callback)` - Intersection Observer for infinite scroll

### Routing

Two layouts defined in `src/layouts/`:
- `MainLayout` - With sidebar (Home, Search, Channel, History, etc.)
- `WatchLayout` - Without sidebar (Watch page for better video viewing)

Routes:
- `/` - Home (video feed with category filtering)
- `/watch/:videoId` - Video player page
- `/search?q=` - Search results
- `/channel/:channelId` - Channel page
- `/trending` - Trending videos
- `/history`, `/watch-later`, `/liked` - User playlists

### Styling

Uses **Tailwind CSS** with custom configuration:
- Custom YouTube-like colors in `tailwind.config.js`
- Dark mode via `dark:` prefix (class-based)
- Custom CSS classes in `src/index.css` (`.btn-primary`, `.chip`, `.sidebar-item`, etc.)

### Component Pattern

Each component follows a folder structure:
- `ComponentName.jsx` - Component implementation
- `index.js` - Re-export for clean imports

### API Layer

Mock API functions in `src/api/videoApi.js` simulate network delays and return data from `src/data/mockData.js`. Replace with real API calls when backend is ready.
