# API Documentation

## Overview

This document describes the API layer used in the YouTube Clone application. Currently, the app uses mock data with simulated network delays. The API is designed to be easily replaceable with a real backend.

---

## Base Configuration

### Axios Instance

```javascript
// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
```

---

## Video APIs

### Get Videos (Paginated)

Fetches a paginated list of videos with optional category filter.

```javascript
getVideos({ pageParam = 1, category = 'All', limit = 12 })
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| pageParam | number | 1 | Page number |
| category | string | 'All' | Category filter |
| limit | number | 12 | Videos per page |

**Response:**
```javascript
{
  videos: [
    {
      id: 'video-1',
      title: 'Video Title',
      description: 'Video description...',
      thumbnail: 'https://...',
      videoUrl: 'https://...',
      duration: 1845,           // seconds
      views: 2500000,
      likes: 125000,
      dislikes: 3200,
      uploadDate: '2024-11-15',
      channelId: 'channel-1',
      channelName: 'Channel Name',
      channelAvatar: 'https://...',
      category: 'Technology',
      tags: ['tag1', 'tag2'],
      isLive: false
    }
  ],
  nextPage: 2,                  // null if last page
  totalCount: 60
}
```

---

### Get Video by ID

Fetches a single video by its ID.

```javascript
getVideoById(videoId)
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | string | Video ID |

**Response:**
```javascript
{
  id: 'video-1',
  title: 'Video Title',
  description: 'Full video description...',
  thumbnail: 'https://...',
  videoUrl: 'https://...',
  duration: 1845,
  views: 2500000,
  likes: 125000,
  dislikes: 3200,
  uploadDate: '2024-11-15',
  channelId: 'channel-1',
  channelName: 'Channel Name',
  channelAvatar: 'https://...',
  category: 'Technology',
  tags: ['tag1', 'tag2'],
  isLive: false
}
```

**Errors:**
- `404`: Video not found

---

### Get Related Videos

Fetches videos related to a specific video.

```javascript
getRelatedVideos(videoId, limit = 20)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| videoId | string | - | Current video ID |
| limit | number | 20 | Max videos to return |

**Response:**
```javascript
[
  { id: 'video-2', title: '...', ... },
  { id: 'video-3', title: '...', ... },
  // ...
]
```

---

### Get Trending Videos

Fetches trending videos sorted by view count.

```javascript
getTrendingVideos(limit = 20)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | number | 20 | Max videos to return |

**Response:**
```javascript
[
  { id: 'video-1', title: '...', views: 15000000, ... },
  { id: 'video-2', title: '...', views: 12000000, ... },
  // ... sorted by views descending
]
```

---

## Search APIs

### Search Videos

Searches videos by title, description, channel name, and tags.

```javascript
searchVideos(query, limit = 20)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| query | string | - | Search query |
| limit | number | 20 | Max results |

**Response:**
```javascript
[
  { id: 'video-1', title: 'Matching video...', ... },
  // ...
]
```

---

### Get Search Suggestions

Gets autocomplete suggestions for search.

```javascript
getSearchSuggestions(query)
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| query | string | Partial search query |

**Response:**
```javascript
[
  'suggestion 1',
  'suggestion 2',
  // ... up to 10 suggestions
]
```

---

## Channel APIs

### Get Channel by ID

Fetches channel information.

```javascript
getChannelById(channelId)
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| channelId | string | Channel ID |

**Response:**
```javascript
{
  id: 'channel-1',
  name: 'Channel Name',
  handle: '@channelname',
  avatar: 'https://...',
  banner: 'https://...',
  subscribers: 2450000,
  videosCount: 342,
  description: 'Channel description...',
  joinedDate: '2018-03-15',
  totalViews: 125000000,
  isVerified: true
}
```

**Errors:**
- `404`: Channel not found

---

### Get Channel Videos

Fetches videos uploaded by a channel.

```javascript
getChannelVideos(channelId, limit = 30)
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| channelId | string | - | Channel ID |
| limit | number | 30 | Max videos |

**Response:**
```javascript
[
  { id: 'video-1', channelId: 'channel-1', ... },
  // ...
]
```

---

## Comments APIs

### Get Comments

Fetches comments for a video.

```javascript
getComments(videoId)
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | string | Video ID |

**Response:**
```javascript
[
  {
    id: 'comment-1',
    videoId: 'video-1',
    userId: 'user-1',
    username: 'User Name',
    userAvatar: 'https://...',
    text: 'Comment text...',
    timestamp: '2024-11-16T10:30:00Z',
    likes: 1250,
    replies: [
      {
        id: 'reply-1',
        userId: 'user-2',
        username: 'Reply User',
        userAvatar: 'https://...',
        text: 'Reply text...',
        timestamp: '2024-11-16T11:15:00Z',
        likes: 89
      }
    ]
  }
]
```

---

### Add Comment

Adds a new comment to a video.

```javascript
addComment(videoId, comment)
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| videoId | string | Video ID |
| comment | object | Comment data |

**Comment Object:**
```javascript
{
  text: 'Comment text',
  username: 'User Name',
  userAvatar: 'https://...'
}
```

**Response:**
```javascript
{
  id: 'comment-new',
  videoId: 'video-1',
  text: 'Comment text',
  username: 'User Name',
  userAvatar: 'https://...',
  timestamp: '2024-11-17T12:00:00Z',
  likes: 0,
  replies: []
}
```

---

## Categories API

### Get Categories

Fetches all available categories.

```javascript
getCategories()
```

**Response:**
```javascript
[
  { id: 'all', name: 'All' },
  { id: 'music', name: 'Music' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'news', name: 'News' },
  { id: 'live', name: 'Live' },
  { id: 'sports', name: 'Sports' },
  { id: 'comedy', name: 'Comedy' },
  { id: 'movies', name: 'Movies' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'learning', name: 'Learning' },
  { id: 'podcasts', name: 'Podcasts' },
  { id: 'tech', name: 'Technology' },
  { id: 'cooking', name: 'Cooking' },
  { id: 'travel', name: 'Travel' },
  { id: 'fitness', name: 'Fitness' }
]
```

---

## Interaction APIs

### Like Video

Likes a video.

```javascript
likeVideo(videoId)
```

**Response:**
```javascript
{
  success: true,
  likes: 125001
}
```

---

### Dislike Video

Dislikes a video.

```javascript
dislikeVideo(videoId)
```

**Response:**
```javascript
{
  success: true,
  dislikes: 3201
}
```

---

### Subscribe to Channel

Subscribes to a channel.

```javascript
subscribeToChannel(channelId)
```

**Response:**
```javascript
{
  success: true,
  subscribers: 2450001
}
```

---

### Unsubscribe from Channel

Unsubscribes from a channel.

```javascript
unsubscribeFromChannel(channelId)
```

**Response:**
```javascript
{
  success: true,
  subscribers: 2449999
}
```

---

## TanStack Query Hooks

### useVideos

```javascript
import { useVideos, useInfiniteVideos } from '../hooks/useVideos';

// Single page
const { data, isLoading, error } = useVideos(category);

// Infinite scroll
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteVideos(category);
```

---

### useVideo

```javascript
import { useVideo, useRelatedVideos } from '../hooks/useVideos';

const { data: video, isLoading } = useVideo(videoId);
const { data: related } = useRelatedVideos(videoId);
```

---

### useChannel

```javascript
import { useChannel, useChannelVideos } from '../hooks/useChannel';

const { data: channel } = useChannel(channelId);
const { data: videos } = useChannelVideos(channelId);
```

---

### useSearch

```javascript
import { useSearch, useSearchResults } from '../hooks/useSearch';

const {
  query,
  suggestions,
  handleInputChange,
  handleSearch
} = useSearch();

const { data: results } = useSearchResults(query);
```

---

### useComments

```javascript
import { useComments, useAddComment } from '../hooks/useComments';

const { data: comments } = useComments(videoId);
const addCommentMutation = useAddComment();

addCommentMutation.mutate({ videoId, comment: { text: '...' } });
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limited |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently no rate limiting in mock API. Real API should implement:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Switching to Real API

1. Update environment variable:
   ```
   REACT_APP_API_URL=https://your-api.com/api
   ```

2. Update `videoApi.js` to use axios instead of mock data:
   ```javascript
   export const getVideos = async (params) => {
     const response = await api.get('/videos', { params });
     return response.data;
   };
   ```

3. Add authentication headers as needed

4. Update data transformations to match API response format
