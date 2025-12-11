import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineFire, HiOutlinePlusCircle } from 'react-icons/hi';
import { MdOutlineSubscriptions, MdOutlineVideoLibrary } from 'react-icons/md';

const navItems = [
  { path: '/', icon: HiOutlineHome, label: 'Home' },
  { path: '/shorts', icon: HiOutlineFire, label: 'Shorts' },
  { path: '/create', icon: HiOutlinePlusCircle, label: '' },
  { path: '/subscriptions', icon: MdOutlineSubscriptions, label: 'Subscriptions' },
  { path: '/library', icon: MdOutlineVideoLibrary, label: 'Library' },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-youtube-dark border-t border-youtube-gray-200 dark:border-youtube-gray-800 md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          // Special styling for create button
          if (item.path === '/create') {
            return (
              <button
                key={item.path}
                className="p-2"
              >
                <div className="w-10 h-8 flex items-center justify-center rounded-lg border-2 border-youtube-gray-700 dark:border-youtube-gray-300">
                  <HiOutlinePlusCircle className="w-6 h-6" />
                </div>
              </button>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`bottom-nav-item ${isActive ? 'bottom-nav-item-active' : ''}`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
