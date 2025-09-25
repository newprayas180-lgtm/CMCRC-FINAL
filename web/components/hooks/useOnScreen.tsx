import { useState, useEffect, RefObject } from 'react';

interface UseOnScreenOptions {
  rootMargin?: string;
  threshold?: number;
}

const useOnScreen = (ref: RefObject<HTMLElement>, options: UseOnScreenOptions = { threshold: 0.1, rootMargin: '0px' }): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).IntersectionObserver) {
      setIntersecting(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: options.rootMargin,
        threshold: options.threshold,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options.rootMargin, options.threshold]);

  return isIntersecting;
};

export default useOnScreen;
