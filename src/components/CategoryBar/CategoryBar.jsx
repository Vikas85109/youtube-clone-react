import React, { useRef, useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useCategories } from '../../hooks/useCategories';

const CategoryBar = ({ selectedCategory, onCategoryChange }) => {
  const { data: categories = [] } = useCategories();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [categories]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    checkScrollButtons();
  };

  return (
    <div className="sticky top-14 z-30 bg-white dark:bg-youtube-dark py-3 border-b border-youtube-gray-200 dark:border-youtube-gray-800">
      <div className="relative">
        {/* Left scroll button */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-r from-white dark:from-youtube-dark via-white dark:via-youtube-dark to-transparent pr-4">
            <button
              onClick={() => scroll('left')}
              className="btn-icon bg-white dark:bg-youtube-dark"
              aria-label="Scroll left"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Categories */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.name)}
              className={`chip flex-shrink-0 ${
                selectedCategory === category.name ? 'chip-active' : ''
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Right scroll button */}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-l from-white dark:from-youtube-dark via-white dark:via-youtube-dark to-transparent pl-4">
            <button
              onClick={() => scroll('right')}
              className="btn-icon bg-white dark:bg-youtube-dark"
              aria-label="Scroll right"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
