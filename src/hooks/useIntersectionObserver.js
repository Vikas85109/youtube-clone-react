import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return { targetRef, isIntersecting, hasIntersected };
};

// Hook specifically for infinite scroll
export const useInfiniteScroll = (callback, options = {}) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    rootMargin: options.rootMargin || '100px',
    threshold: options.threshold || 0,
  });

  useEffect(() => {
    if (isIntersecting) {
      callback();
    }
  }, [isIntersecting, callback]);

  return targetRef;
};
