import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, MobileBottomNav } from '../components';

// Watch layout without sidebar for video watching experience
const WatchLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-youtube-dark">
      {/* Navbar */}
      <Navbar />

      {/* Main content - full width */}
      <main className="pt-14 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default WatchLayout;
