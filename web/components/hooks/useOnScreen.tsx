import { useState, useEffect, RefObject } from 'react';

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
