import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  HiOutlineHome,
  HiOutlineFire,
  HiOutlinePlay,
  HiOutlineClock,
  HiOutlineThumbUp,
  HiOutlineFilm,
} from 'react-icons/hi';
import { MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineHistory } from 'react-icons/md';
import { RiPlayList2Line } from 'react-icons/ri';
import {
  selectIsSidebarCollapsed,
  selectIsMobileSidebarOpen,
  closeMobileSidebar,
} from '../../store/slices/sidebarSlice';
import { selectSubscriptions } from '../../store/slices/subscriptionsSlice';

const mainNavItems = [
  { path: '/', icon: HiOutlineHome, label: 'Home' },
  { path: '/shorts', icon: HiOutlinePlay, label: 'Shorts' },
  { path: '/subscriptions', icon: MdOutlineSubscriptions, label: 'Subscriptions' },
];

const libraryNavItems = [
  { path: '/history', icon: MdOutlineHistory, label: 'History' },
  { path: '/playlists', icon: RiPlayList2Line, label: 'Playlists' },
  { path: '/watch-later', icon: HiOutlineClock, label: 'Watch later' },
  { path: '/liked', icon: HiOutlineThumbUp, label: 'Liked videos' },
];

const exploreNavItems = [
  { path: '/trending', icon: HiOutlineFire, label: 'Trending' },
  { path: '/movies', icon: HiOutlineFilm, label: 'Movies' },
];

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isCollapsed = useSelector(selectIsSidebarCollapsed);
  const isMobileOpen = useSelector(selectIsMobileSidebarOpen);
  const subscriptions = useSelector(selectSubscriptions);

  const NavItem = ({ path, icon: Icon, label, avatar }) => {
    const isActive = location.pathname === path;

    return (
      <NavLink
        to={path}
        onClick={() => dispatch(closeMobileSidebar())}
        className={`sidebar-item ${isActive ? 'sidebar-item-active' : ''} ${
          isCollapsed ? 'flex-col gap-1 px-0 py-4 justify-center' : ''
        }`}
      >
        {avatar ? (
          <img src={avatar} alt={label} className="w-6 h-6 rounded-full" />
        ) : (
          <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
        )}
        <span className={`${isCollapsed ? 'text-[10px]' : 'text-sm'} truncate`}>
          {label}
        </span>
      </NavLink>
    );
  };

  const sidebarContent = (
    <div className={`h-full overflow-y-auto scrollbar-hide ${isCollapsed ? 'py-2' : 'py-3 px-3'}`}>
      {/* Main nav */}
      <div className={`${isCollapsed ? '' : 'pb-3 border-b border-youtube-gray-200 dark:border-youtube-gray-800'}`}>
        {mainNavItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </div>

      {/* Library section - only show when expanded */}
      {!isCollapsed && (
        <>
          <div className="py-3 border-b border-youtube-gray-200 dark:border-youtube-gray-800">
            <h3 className="px-3 mb-1 text-sm font-medium text-youtube-gray-600 dark:text-youtube-gray-400">
              Library
            </h3>
            {libraryNavItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>

          {/* Explore section */}
          <div className="py-3 border-b border-youtube-gray-200 dark:border-youtube-gray-800">
            <h3 className="px-3 mb-1 text-sm font-medium text-youtube-gray-600 dark:text-youtube-gray-400">
              Explore
            </h3>
            {exploreNavItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>

          {/* Subscriptions section */}
          {subscriptions.length > 0 && (
            <div className="py-3">
              <h3 className="px-3 mb-1 text-sm font-medium text-youtube-gray-600 dark:text-youtube-gray-400">
                Subscriptions
              </h3>
              {subscriptions.slice(0, 7).map((channel) => (
                <NavItem
                  key={channel.id}
                  path={`/channel/${channel.id}`}
                  icon={null}
                  label={channel.name}
                  avatar={channel.avatar}
                />
              ))}
              {subscriptions.length > 7 && (
                <NavLink
                  to="/subscriptions"
                  className="sidebar-item text-blue-500"
                >
                  <MdOutlineVideoLibrary className="w-5 h-5" />
                  <span className="text-sm">Show more</span>
                </NavLink>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white dark:bg-youtube-dark transition-all duration-300 z-40 hidden xl:block ${
          isCollapsed ? 'w-[72px]' : 'w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => dispatch(closeMobileSidebar())}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white dark:bg-youtube-dark z-50 transform transition-transform duration-300 xl:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-14 flex items-center px-4 border-b border-youtube-gray-200 dark:border-youtube-gray-800">
          <span className="text-xl font-semibold">YouTube</span>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
