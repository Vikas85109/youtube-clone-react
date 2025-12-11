# YouTube Clone - React Application

A fully functional YouTube clone built with modern React technologies. This project replicates the core features and UI of YouTube, providing a seamless video browsing and watching experience.

![YouTube Clone](https://img.shields.io/badge/React-19.0.0-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-green) ![Redux](https://img.shields.io/badge/Redux_Toolkit-2.3-purple)

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Pages & Components](#pages--components)
7. [State Management](#state-management)
8. [API Layer](#api-layer)
9. [Styling](#styling)
10. [Screenshots](#screenshots)
11. [Future Enhancements](#future-enhancements)
12. [Contributing](#contributing)
13. [License](#license)

---

## Features

### Core Features
- **Homepage** - Video feed grid with infinite scroll
- **Category Filters** - Chip-based category filtering (All, Music, Gaming, News, etc.)
- **Search** - Search bar with autocomplete suggestions and recent search history
- **Video Player** - Full-featured video player with native controls
- **Comments Section** - View comments with nested replies
- **Like/Dislike** - Interactive like and dislike buttons
- **Subscribe** - Subscribe to channels functionality

### Navigation
- **Sidebar** - Collapsible navigation sidebar
- **Mobile Bottom Nav** - Bottom navigation bar for mobile devices
- **Responsive Design** - Works on desktop, tablet, and mobile

### User Features
- **Watch History** - Track watched videos with progress
- **Watch Later** - Save videos to watch later
- **Liked Videos** - Collection of liked videos
- **Dark/Light Mode** - Toggle between themes (persisted)

### Additional Pages
- **Channel Page** - Channel banner, stats, and video tabs
- **Trending** - Trending videos sorted by views
- **Search Results** - Search results page with filters

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI Framework |
| React Router DOM | 7.1.1 | Client-side routing |
| Redux Toolkit | 2.3.0 | State management |
| TanStack Query | 5.62.0 | Server state & caching |
| Axios | 1.7.9 | HTTP client |
| Tailwind CSS | 3.4.17 | Styling |
| react-player | 2.16.0 | Video playback |
| react-icons | 5.4.0 | Icon library |

---

## Project Structure

```
youtube-clone-react/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── api/                    # API layer
│   │   ├── axios.js            # Axios instance configuration
│   │   ├── videoApi.js         # Mock API functions
│   │   └── index.js            # API exports
│   ├── components/             # Reusable components
│   │   ├── CategoryBar/        # Category filter chips
│   │   ├── ChannelCard/        # Channel display card
│   │   ├── CommentSection/     # Comments display
│   │   ├── MobileBottomNav/    # Mobile navigation
│   │   ├── Navbar/             # Top navigation bar
│   │   ├── SearchBar/          # Search with suggestions
│   │   ├── Sidebar/            # Side navigation
│   │   ├── SkeletonLoader/     # Loading skeletons
│   │   ├── SuggestedVideos/    # Related videos
│   │   ├── VideoCard/          # Video thumbnail card
│   │   ├── VideoGrid/          # Video grid layout
│   │   ├── VideoPlayer/        # Video player component
│   │   └── index.js            # Component exports
│   ├── data/
│   │   └── mockData.js         # Mock videos, channels, comments
│   ├── hooks/                  # Custom React hooks
│   │   ├── useCategories.js    # Categories data hook
│   │   ├── useChannel.js       # Channel data hook
│   │   ├── useClickOutside.js  # Click outside detection
│   │   ├── useComments.js      # Comments data hook
│   │   ├── useIntersectionObserver.js  # Infinite scroll
│   │   ├── useSearch.js        # Search functionality
│   │   ├── useVideos.js        # Videos data hook
│   │   └── index.js            # Hook exports
│   ├── layouts/                # Layout components
│   │   ├── MainLayout.jsx      # Layout with sidebar
│   │   ├── WatchLayout.jsx     # Layout for video page
│   │   └── index.js            # Layout exports
│   ├── pages/                  # Page components
│   │   ├── Channel/            # Channel page
│   │   ├── History/            # Watch history
│   │   ├── Home/               # Homepage
│   │   ├── LikedVideos/        # Liked videos
│   │   ├── NotFound/           # 404 page
│   │   ├── Search/             # Search results
│   │   ├── Trending/           # Trending videos
│   │   ├── Watch/              # Video watch page
│   │   ├── WatchLater/         # Watch later playlist
│   │   └── index.js            # Page exports
│   ├── store/                  # Redux store
│   │   ├── slices/             # Redux slices
│   │   │   ├── historySlice.js
│   │   │   ├── likedVideosSlice.js
│   │   │   ├── searchSlice.js
│   │   │   ├── sidebarSlice.js
│   │   │   ├── subscriptionsSlice.js
│   │   │   ├── themeSlice.js
│   │   │   └── watchLaterSlice.js
│   │   └── index.js            # Store configuration
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.js                  # Main App component
│   ├── index.css               # Global styles
│   └── index.js                # Entry point
├── .eslintrc.js                # ESLint configuration
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # This file
```

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/youtube-clone-react.git
   cd youtube-clone-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
npm run build
```

---

## Usage

### Navigation
- **Home**: Browse all videos with category filters
- **Search**: Use the search bar to find videos
- **Sidebar**: Access different sections (History, Watch Later, Liked Videos)
- **Dark Mode**: Toggle theme using the moon/sun icon in navbar

### Watching Videos
1. Click on any video thumbnail to watch
2. Use native video controls to play/pause, seek, adjust volume
3. View video description, likes, and channel info
4. Browse suggested videos in the sidebar

### Managing Playlists
- **Watch Later**: Click the clock icon on any video card
- **Liked Videos**: Click the like button on a video
- **History**: Automatically tracked when you watch videos

---

## Pages & Components

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Main video feed with categories |
| Watch | `/watch/:videoId` | Video player page |
| Search | `/search?q=query` | Search results |
| Channel | `/channel/:channelId` | Channel page |
| History | `/history` | Watch history |
| Watch Later | `/watch-later` | Saved videos |
| Liked Videos | `/liked` | Liked videos |
| Trending | `/trending` | Trending videos |

### Key Components

| Component | Description |
|-----------|-------------|
| `Navbar` | Top navigation with search and theme toggle |
| `Sidebar` | Collapsible side navigation |
| `VideoCard` | Video thumbnail with metadata |
| `VideoGrid` | Responsive grid/list of videos |
| `VideoPlayer` | React Player wrapper with controls |
| `CategoryBar` | Horizontal scrollable category chips |
| `SearchBar` | Search input with autocomplete |
| `CommentSection` | Comments with replies |
| `SuggestedVideos` | Related videos sidebar |

---

## State Management

### Redux Slices

| Slice | Purpose | Persistence |
|-------|---------|-------------|
| `themeSlice` | Dark/light mode | localStorage |
| `sidebarSlice` | Sidebar open/close state | No |
| `searchSlice` | Search query & suggestions | localStorage (recent) |
| `historySlice` | Watch history & progress | localStorage |
| `watchLaterSlice` | Watch later playlist | localStorage |
| `likedVideosSlice` | Liked videos | localStorage |
| `subscriptionsSlice` | Channel subscriptions | localStorage |

### TanStack Query

Used for server state management with:
- Automatic caching (5 minutes stale time)
- Background refetching
- Infinite scroll support
- Optimistic updates

---

## API Layer

### Mock API Functions

```javascript
// Videos
getVideos({ pageParam, category, limit })  // Get paginated videos
getVideoById(videoId)                       // Get single video
getRelatedVideos(videoId, limit)            // Get related videos
getTrendingVideos(limit)                    // Get trending videos

// Search
searchVideos(query, limit)                  // Search videos
getSearchSuggestions(query)                 // Get suggestions

// Channel
getChannelById(channelId)                   // Get channel info
getChannelVideos(channelId, limit)          // Get channel videos

// Comments
getComments(videoId)                        // Get video comments
addComment(videoId, comment)                // Add new comment

// Categories
getCategories()                             // Get all categories
```

### Sample Video Sources
The app uses public domain videos from Google's sample video storage:
- Big Buck Bunny
- Elephants Dream
- Sintel
- Tears of Steel
- And more...

---

## Styling

### Tailwind CSS Configuration

Custom YouTube-like color palette:
```javascript
colors: {
  youtube: {
    red: '#FF0000',
    dark: '#0F0F0F',
    gray: {
      50: '#F9F9F9',
      100: '#F1F1F1',
      200: '#E5E5E5',
      // ...
      900: '#0F0F0F',
    }
  }
}
```

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Dark Mode
Implemented using Tailwind's `dark:` variant with class-based toggling.

---

## Screenshots

### Homepage
```
+------------------------------------------+
|  [Logo]  [====Search====]  [Icons] [User]|
+------------------------------------------+
|      | [All] [Music] [Gaming] [News]     |
| Side |  +------+  +------+  +------+     |
| bar  |  |Video |  |Video |  |Video |     |
|      |  +------+  +------+  +------+     |
|      |  +------+  +------+  +------+     |
|      |  |Video |  |Video |  |Video |     |
+------------------------------------------+
```

### Watch Page
```
+------------------------------------------+
|  [Logo]  [====Search====]  [Icons] [User]|
+------------------------------------------+
|  +------------------+  +---------------+ |
|  |                  |  | Suggested     | |
|  |   Video Player   |  | +--+ +--+     | |
|  |                  |  | |  | |  |     | |
|  +------------------+  | +--+ +--+     | |
|  Title                 |               | |
|  Channel | Subscribe   |               | |
|  [Like] [Dislike]      +---------------+ |
|  Description...                          |
|  Comments...                             |
+------------------------------------------+
```

---

## Future Enhancements

- [ ] Real YouTube API integration
- [ ] User authentication
- [ ] Video upload functionality
- [ ] Playlist creation and management
- [ ] Shorts support
- [ ] Live streaming
- [ ] Notifications
- [ ] Picture-in-Picture mode
- [ ] Keyboard shortcuts
- [ ] Video quality selection
- [ ] Subtitles/Captions support
- [ ] Share functionality
- [ ] Mini player

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TanStack Query](https://tanstack.com/query)
- [React Player](https://github.com/cookpete/react-player)
- [React Icons](https://react-icons.github.io/react-icons/)
- Sample videos from [Google](https://goo.gl/Rqz8ND)

---

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/youtube-clone-react](https://github.com/yourusername/youtube-clone-react)

---

**Made with React**
