import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HiOutlineMenu,
  HiOutlineBell,
  HiOutlineVideoCamera,
} from 'react-icons/hi';
import { BsYoutube } from 'react-icons/bs';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { toggleTheme, selectTheme } from '../../store/slices/themeSlice';
import { toggleSidebar } from '../../store/slices/sidebarSlice';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-youtube-dark h-14 flex items-center justify-between px-4 border-b border-youtube-gray-200 dark:border-youtube-gray-800">
      {/* Left section - Menu & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="btn-icon hidden sm:flex"
          aria-label="Toggle sidebar"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-1">
          <BsYoutube className="w-8 h-8 text-youtube-red" />
          <span className="text-xl font-semibold tracking-tight hidden sm:inline">
            YouTube
          </span>
        </Link>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-2xl mx-4 hidden md:block">
        <SearchBar />
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile search */}
        <Link to="/search" className="btn-icon md:hidden">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Link>

        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="btn-icon"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <MdOutlineLightMode className="w-5 h-5" />
          ) : (
            <MdOutlineDarkMode className="w-5 h-5" />
          )}
        </button>

        {/* Create */}
        <button className="btn-icon hidden sm:flex" aria-label="Create">
          <HiOutlineVideoCamera className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="btn-icon relative" aria-label="Notifications">
          <HiOutlineBell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-youtube-red rounded-full" />
        </button>

        {/* Profile */}
        <button className="ml-2" aria-label="Profile">
          <img
            src="https://picsum.photos/seed/user/40/40"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
