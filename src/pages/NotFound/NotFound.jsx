import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="mb-8">
        <svg
          className="w-32 h-32 mx-auto text-youtube-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-youtube-gray-600 dark:text-youtube-gray-400 mb-2">
        This page isn't available
      </p>
      <p className="text-youtube-gray-500 mb-8">
        The link you followed may be broken, or the page may have been removed.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-youtube-red text-white font-medium rounded-full hover:bg-red-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
