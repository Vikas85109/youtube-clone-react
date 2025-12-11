import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
  isCollapsed: false,
  isMobileOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      if (window.innerWidth < 1280) {
        state.isMobileOpen = !state.isMobileOpen;
      } else {
        state.isCollapsed = !state.isCollapsed;
      }
    },
    setSidebarOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setSidebarCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
    setMobileSidebarOpen: (state, action) => {
      state.isMobileOpen = action.payload;
    },
    closeMobileSidebar: (state) => {
      state.isMobileOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setSidebarCollapsed,
  setMobileSidebarOpen,
  closeMobileSidebar,
} = sidebarSlice.actions;

export const selectIsSidebarOpen = (state) => state.sidebar.isOpen;
export const selectIsSidebarCollapsed = (state) => state.sidebar.isCollapsed;
export const selectIsMobileSidebarOpen = (state) => state.sidebar.isMobileOpen;

export default sidebarSlice.reducer;
