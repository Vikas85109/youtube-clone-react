# Components Documentation

## Overview

This document provides detailed information about all React components used in the YouTube Clone application.

---

## Table of Contents

1. [Layout Components](#layout-components)
2. [Navigation Components](#navigation-components)
3. [Video Components](#video-components)
4. [Interactive Components](#interactive-components)
5. [Utility Components](#utility-components)

---

## Layout Components

### MainLayout

Main layout wrapper with navbar and collapsible sidebar.

**File:** `src/layouts/MainLayout.jsx`

**Usage:**
```jsx
<MainLayout>
  <HomePage />
</MainLayout>
```

**Features:**
- Responsive sidebar (collapsible on mobile)
- Fixed navbar at top
- Content area with proper padding
- Mobile bottom navigation

---

### WatchLayout

Simplified layout for video watch page without sidebar.

**File:** `src/layouts/WatchLayout.jsx`

**Usage:**
```jsx
<WatchLayout>
  <WatchPage />
</WatchLayout>
```

**Features:**
- Navbar only (no sidebar)
- Full-width content area
- Mobile bottom navigation

---

## Navigation Components

### Navbar

Top navigation bar with logo, search, and user actions.

**File:** `src/components/Navbar/Navbar.jsx`

**Props:** None (uses Redux for state)

**Features:**
- Logo with home link
- Search bar with suggestions
- Theme toggle (dark/light)
- User menu
- Notification icon
- Mobile hamburger menu

**Redux State Used:**
- `themeSlice` - Theme toggle
- `sidebarSlice` - Sidebar toggle

---

### Sidebar

Collapsible side navigation menu.

**File:** `src/components/Sidebar/Sidebar.jsx`

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| isOpen | boolean | Sidebar visibility |

**Sections:**
- Main: Home, Trending, Subscriptions
- Library: History, Watch Later, Liked Videos
- Explore: Music, Gaming, News, etc.

**Features:**
- Collapsible on mobile
- Active link highlighting
- Smooth transitions
- Subscription list

---

### MobileBottomNav

Bottom navigation for mobile devices.

**File:** `src/components/MobileBottomNav/MobileBottomNav.jsx`

**Props:** None

**Items:**
- Home
- Shorts
- Subscriptions
- Library

**Features:**
- Fixed at bottom
- Only visible on mobile (< 768px)
- Active state indication

---

### SearchBar

Search input with autocomplete suggestions.

**File:** `src/components/SearchBar/SearchBar.jsx`

**Props:** None (uses useSearch hook)

**Features:**
- Debounced input (300ms)
- Autocomplete suggestions
- Recent searches
- Clear button
- Keyboard navigation
- Mobile-friendly

**Hook Used:** `useSearch`

---

## Video Components

### VideoCard

Video thumbnail card with metadata.

**File:** `src/components/VideoCard/VideoCard.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| video | object | required | Video data |
| layout | string | 'grid' | 'grid' or 'list' |

**Video Object:**
```javascript
{
  id: string,
  title: string,
  thumbnail: string,
  duration: number,
  views: number,
  uploadDate: string,
  channelName: string,
  channelAvatar: string,
  channelId: string
}
```

**Features:**
- Thumbnail with duration overlay
- Hover menu (Watch Later, etc.)
- Channel avatar link
- View count formatting
- Relative time display
- Grid/List layout support

---

### VideoGrid

Responsive grid of video cards.

**File:** `src/components/VideoGrid/VideoGrid.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| videos | array | required | Array of videos |
| layout | string | 'grid' | 'grid' or 'list' |
| loading | boolean | false | Show skeleton |

**Features:**
- Responsive grid (1-4 columns)
- List view option
- Loading skeleton
- Empty state

**Grid Breakpoints:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

---

### VideoPlayer

Video player with controls.

**File:** `src/components/VideoPlayer/VideoPlayer.jsx`

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| video | object | Video data with videoUrl |

**Features:**
- React Player integration
- Native HTML5 controls
- Progress tracking
- History integration
- Resume playback
- Responsive aspect ratio

**Sample Video URLs:**
Uses public domain videos from Google's sample storage.

---

### SuggestedVideos

Related videos sidebar on watch page.

**File:** `src/components/SuggestedVideos/SuggestedVideos.jsx`

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| videoId | string | Current video ID |

**Features:**
- Related videos list
- Compact video cards
- Loading skeleton
- Click to navigate

---

### CategoryBar

Horizontal scrollable category chips.

**File:** `src/components/CategoryBar/CategoryBar.jsx`

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| selected | string | Selected category |
| onSelect | function | Selection handler |

**Features:**
- Horizontal scroll
- Active state styling
- Scroll buttons (desktop)
- Touch scroll (mobile)

---

## Interactive Components

### CommentSection

Comments display with replies.

**File:** `src/components/CommentSection/CommentSection.jsx`

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| videoId | string | Video ID |

**Features:**
- Comment list
- Nested replies
- Like counts
- User avatars
- Relative timestamps
- Add comment form
- Sort by (Top/Newest)

**Comment Structure:**
```javascript
{
  id: string,
  username: string,
  userAvatar: string,
  text: string,
  timestamp: string,
  likes: number,
  replies: array
}
```

---

### ChannelCard

Channel display card.

**File:** `src/components/ChannelCard/ChannelCard.jsx`

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| channel | object | Channel data |

**Features:**
- Channel avatar
- Subscriber count
- Video count
- Subscribe button
- Verified badge

---

## Utility Components

### SkeletonLoader

Loading placeholder component.

**File:** `src/components/SkeletonLoader/SkeletonLoader.jsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | 'video' | Skeleton type |
| count | number | 1 | Number of items |

**Types:**
- `video` - Video card skeleton
- `channel` - Channel card skeleton
- `comment` - Comment skeleton
- `text` - Text line skeleton

**Features:**
- Animated pulse effect
- Matches component dimensions
- Dark mode support

---

## Component Exports

All components are exported from `src/components/index.js`:

```javascript
export { default as Navbar } from './Navbar/Navbar';
export { default as SearchBar } from './SearchBar/SearchBar';
export { default as Sidebar } from './Sidebar/Sidebar';
export { default as VideoCard } from './VideoCard/VideoCard';
export { default as VideoGrid } from './VideoGrid/VideoGrid';
export { default as VideoPlayer } from './VideoPlayer/VideoPlayer';
export { default as CategoryBar } from './CategoryBar/CategoryBar';
export { default as CommentSection } from './CommentSection/CommentSection';
export { default as ChannelCard } from './ChannelCard/ChannelCard';
export { default as SuggestedVideos } from './SuggestedVideos/SuggestedVideos';
export { default as MobileBottomNav } from './MobileBottomNav/MobileBottomNav';
export { default as SkeletonLoader } from './SkeletonLoader/SkeletonLoader';
```

---

## Styling Guidelines

### Tailwind Classes

All components use Tailwind CSS with custom YouTube colors:

```javascript
// Primary colors
'text-youtube-red'      // #FF0000
'bg-youtube-dark'       // #0F0F0F

// Gray scale
'text-youtube-gray-600' // Text secondary
'bg-youtube-gray-100'   // Background light

// Dark mode
'dark:bg-youtube-dark'
'dark:text-white'
```

### Responsive Design

```javascript
// Mobile first
'w-full'              // Base
'sm:w-1/2'            // >= 640px
'md:w-1/3'            // >= 768px
'lg:w-1/4'            // >= 1024px
'xl:w-1/5'            // >= 1280px
```

### Transitions

```javascript
'transition-all duration-200'
'transition-colors duration-300'
'transition-transform duration-200'
```

---

## Best Practices

### Component Structure

```
ComponentName/
├── ComponentName.jsx    # Main component
├── ComponentName.css    # Styles (if needed)
└── index.js            # Export
```

### Prop Types (Future)

```javascript
import PropTypes from 'prop-types';

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    // ...
  }).isRequired,
  layout: PropTypes.oneOf(['grid', 'list'])
};

VideoCard.defaultProps = {
  layout: 'grid'
};
```

### Memoization

```javascript
import React, { memo, useMemo, useCallback } from 'react';

const VideoCard = memo(({ video, layout }) => {
  const formattedViews = useMemo(
    () => formatViews(video.views),
    [video.views]
  );

  const handleClick = useCallback(() => {
    // Handle click
  }, []);

  return (/* ... */);
});
```
