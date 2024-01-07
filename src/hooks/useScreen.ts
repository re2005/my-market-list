// hooks/useViewportSize.ts
import { useEffect, useState } from 'react';

interface ViewportSize {
  width: number;
  height: number;
  size: 'sm' | 'md' | 'lg';
}

const useViewportSize = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    size: 'sm',
  });

  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
  };

  const determineSize = (width: number): 'sm' | 'md' | 'lg' => {
    if (width >= breakpoints.lg) {
      return 'lg';
    } else if (width >= breakpoints.md) {
      return 'md';
    } else {
      return 'sm';
    }
  };

  const handleResize = () => {
    const { innerWidth, innerHeight } = window;
    setViewportSize({
      width: innerWidth,
      height: innerHeight,
      size: determineSize(innerWidth),
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size check

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs once after initial render

  return viewportSize;
};

export default useViewportSize;
