import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Sidebar, MobileBottomNav } from '../components';
import { selectIsSidebarCollapsed } from '../store/slices/sidebarSlice';

const MainLayout = () => {
  const isCollapsed = useSelector(selectIsSidebarCollapsed);

  return (
    <div className="min-h-screen bg-white dark:bg-youtube-dark">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main
        className={`pt-14 pb-16 md:pb-0 transition-all duration-300 ${
          isCollapsed ? 'xl:ml-[72px]' : 'xl:ml-60'
        }`}
      >
        <Outlet />
      </main>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default MainLayout;
