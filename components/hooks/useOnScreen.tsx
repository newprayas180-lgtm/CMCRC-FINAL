import React, { useState, useEffect, useRef, RefObject } from 'react';

interface UseOnScreenOptions {
  rootMargin?: string;
  threshold?: number;
}

const useOnScreen = (ref: RefObject<HTMLElement>, options: UseOnScreenOptions = { threshold: 0.1, rootMargin: '0px' }): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          // Unobserve after it's visible so the animation doesn't re-trigger
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        rootMargin: options.rootMargin,
        threshold: options.threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options.rootMargin, options.threshold]);

  return isIntersecting;
};

export default useOnScreen;
