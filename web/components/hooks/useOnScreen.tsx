import { useState, useEffect, RefObject } from 'react';

interface UseOnScreenOptions {
  rootMargin?: string;
  threshold?: number;
}

const useOnScreen = (ref: RefObject<HTMLElement>, options: UseOnScreenOptions = { threshold: 0.1, rootMargin: '0px' }): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  // Re-observe whenever the actual DOM node appears/changes
  const target = ref.current;
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).IntersectionObserver) {
      // No IO support; don't hide anything
      setIntersecting(true);
      return;
    }
    if (!target) return;
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

    observer.observe(target);
    return () => observer.unobserve(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, options.rootMargin, options.threshold]);

  return isIntersecting;
};

export default useOnScreen;
