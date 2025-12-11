# Architecture Documentation

## Overview

This YouTube Clone follows a modern React architecture with clear separation of concerns, making it maintainable and scalable.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Application                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     Presentation Layer                     │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │  │
│  │  │  Pages  │ │ Layouts │ │Components│ │  Hooks  │        │  │
│  │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘        │  │
│  └───────┼──────────┼──────────┼──────────┼────────────────┘  │
│          │          │          │          │                     │
│  ┌───────┴──────────┴──────────┴──────────┴────────────────┐  │
│  │                      State Layer                          │  │
│  │  ┌─────────────────┐     ┌─────────────────────────┐    │  │
│  │  │   Redux Store   │     │    TanStack Query       │    │  │
│  │  │  (Client State) │     │   (Server State)        │    │  │
│  │  └────────┬────────┘     └───────────┬─────────────┘    │  │
│  └───────────┼──────────────────────────┼──────────────────┘  │
│              │                          │                       │
│  ┌───────────┴──────────────────────────┴──────────────────┐  │
│  │                       Data Layer                          │  │
│  │  ┌─────────────────┐     ┌─────────────────────────┐    │  │
│  │  │   API Layer     │     │      Mock Data          │    │  │
│  │  │   (Axios)       │     │   (Local JSON)          │    │  │
│  │  └─────────────────┘     └─────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layer Descriptions

### 1. Presentation Layer

#### Pages
Top-level route components that compose layouts and features.

```
pages/
├── Home/           # Main video feed
├── Watch/          # Video player page
├── Search/         # Search results
├── Channel/        # Channel profile
├── History/        # Watch history
├── WatchLater/     # Saved videos
├── LikedVideos/    # Liked videos
├── Trending/       # Trending videos
└── NotFound/       # 404 page
```

#### Layouts
Wrapper components providing consistent page structure.

```
layouts/
├── MainLayout      # Navbar + Sidebar + Content
└── WatchLayout     # Navbar + Content (no sidebar)
```

#### Components
Reusable UI components following atomic design principles.

```
components/
├── Atoms (Basic)
│   └── SkeletonLoader
├── Molecules (Combined)
│   ├── VideoCard
│   ├── ChannelCard
│   └── SearchBar
└── Organisms (Complex)
    ├── Navbar
    ├── Sidebar
    ├── VideoPlayer
    ├── CommentSection
    └── VideoGrid
```

#### Hooks
Custom hooks encapsulating reusable logic.

```
hooks/
├── useVideos           # Video data fetching
├── useChannel          # Channel data fetching
├── useComments         # Comments fetching
├── useSearch           # Search functionality
├── useCategories       # Categories fetching
├── useClickOutside     # Click outside detection
└── useIntersectionObserver  # Infinite scroll
```

---

### 2. State Layer

#### Redux Store (Client State)
Manages UI state and user preferences that persist across sessions.

```javascript
store/
├── slices/
│   ├── themeSlice          # Dark/Light mode
│   ├── sidebarSlice        # Sidebar state
│   ├── searchSlice         # Search state
│   ├── historySlice        # Watch history
│   ├── watchLaterSlice     # Watch later list
│   ├── likedVideosSlice    # Liked videos
│   └── subscriptionsSlice  # Subscriptions
└── index.js                # Store configuration
```

**State Persistence:**
```javascript
// localStorage keys
'youtube-clone-theme'         // Theme preference
'youtube-clone-history'       // Watch history
'youtube-clone-watch-later'   // Watch later list
'youtube-clone-liked-videos'  // Liked videos
'youtube-clone-subscriptions' // Subscriptions
'youtube-clone-recent-searches' // Recent searches
```

#### TanStack Query (Server State)
Manages server data with automatic caching and background updates.

```javascript
// Query configuration
{
  staleTime: 5 * 60 * 1000,    // 5 minutes
  refetchOnWindowFocus: true,
  retry: 1
}

// Query keys
['videos', { category, page }]
['video', videoId]
['channel', channelId]
['comments', videoId]
['search', query]
['suggestions', query]
['categories']
```

---

### 3. Data Layer

#### API Layer
Axios instance with interceptors for request/response handling.

```javascript
// api/axios.js
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

#### Mock Data
Local data simulating API responses for development.

```javascript
// data/mockData.js
export const mockVideos = [...];      // 60+ videos
export const mockChannels = [...];    // 8 channels
export const mockComments = [...];    // Sample comments
export const mockCategories = [...];  // 15 categories
```

---

## Data Flow

### Reading Data

```
User Action → Component → Hook → TanStack Query → API → Mock Data
                                      ↓
                              Cache (5 min)
                                      ↓
                              Component Re-render
```

### Writing Data (Client State)

```
User Action → Component → Dispatch → Redux Slice → localStorage
                                          ↓
                                    State Update
                                          ↓
                                  Component Re-render
```

---

## Component Communication

### Props Down, Events Up

```
┌─────────────────────────────────────┐
│              App                     │
│  ┌─────────────────────────────┐   │
│  │         MainLayout           │   │
│  │  ┌──────────┐ ┌──────────┐  │   │
│  │  │  Navbar  │ │ Sidebar  │  │   │
│  │  └──────────┘ └──────────┘  │   │
│  │  ┌──────────────────────┐   │   │
│  │  │       HomePage       │   │   │
│  │  │  ┌────────────────┐  │   │   │
│  │  │  │   VideoGrid    │  │   │   │
│  │  │  │  ┌──────────┐  │  │   │   │
│  │  │  │  │VideoCard │  │  │   │   │
│  │  │  │  └──────────┘  │  │   │   │
│  │  │  └────────────────┘  │   │   │
│  │  └──────────────────────┘   │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Context Usage

```javascript
// Redux for global state
<Provider store={store}>
  // TanStack Query for server state
  <QueryClientProvider client={queryClient}>
    // React Router for navigation
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
</Provider>
```

---

## Routing Structure

```javascript
Routes
├── MainLayout
│   ├── /                  → Home
│   ├── /search            → Search
│   ├── /channel/:id       → Channel
│   ├── /history           → History
│   ├── /watch-later       → WatchLater
│   ├── /liked             → LikedVideos
│   ├── /trending          → Trending
│   ├── /shorts            → Placeholder
│   ├── /subscriptions     → Placeholder
│   └── /library           → Placeholder
├── WatchLayout
│   └── /watch/:videoId    → Watch
└── *                      → NotFound
```

---

## Performance Optimizations

### 1. Code Splitting
```javascript
// Lazy loading pages (future enhancement)
const Home = lazy(() => import('./pages/Home'));
const Watch = lazy(() => import('./pages/Watch'));
```

### 2. Memoization
```javascript
// Component memoization
export default React.memo(VideoCard);

// Selector memoization
const selectIsInWatchLater = (videoId) =>
  createSelector(
    selectWatchLater,
    (watchLater) => watchLater.some(v => v.id === videoId)
  );
```

### 3. Query Caching
```javascript
// TanStack Query caching
useQuery({
  queryKey: ['videos', category],
  queryFn: () => getVideos({ category }),
  staleTime: 5 * 60 * 1000,  // Cache for 5 minutes
});
```

### 4. Infinite Scroll
```javascript
// Load more on scroll
useInfiniteQuery({
  queryKey: ['videos'],
  queryFn: ({ pageParam }) => getVideos({ pageParam }),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

---

## Error Handling

### API Errors
```javascript
// Axios interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

### Query Errors
```javascript
// TanStack Query error handling
const { data, error, isError } = useQuery({
  queryKey: ['video', id],
  queryFn: () => getVideoById(id),
  retry: 1,
});

if (isError) return <ErrorComponent error={error} />;
```

### Component Errors
```javascript
// Error boundaries (future enhancement)
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

---

## Security Considerations

1. **XSS Prevention**: React automatically escapes values
2. **CORS**: Configured in Axios instance
3. **localStorage**: Only non-sensitive data stored
4. **Input Validation**: Search queries sanitized

---

## Scalability

### Adding New Features

1. **New Page**: Create in `pages/`, add route in `App.js`
2. **New Component**: Create in `components/`, export in `index.js`
3. **New State**: Create slice in `store/slices/`
4. **New API**: Add function in `api/videoApi.js`

### Switching to Real API

1. Update `api/videoApi.js` to call real endpoints
2. Update mock data format to match API response
3. Add authentication headers in Axios interceptor
4. Update environment variables

---

## Testing Strategy (Future)

```
tests/
├── unit/           # Component tests
├── integration/    # Feature tests
└── e2e/           # End-to-end tests
```

```javascript
// Example test
describe('VideoCard', () => {
  it('renders video title', () => {
    render(<VideoCard video={mockVideo} />);
    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();
  });
});
```
