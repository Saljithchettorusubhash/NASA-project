import React, { useEffect, useRef } from 'react';

interface LazyLoadProps {
  loadMore: () => void;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ loadMore }) => {
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loadMore]);

  return <div ref={loader} className="lazy-loader h-12" />;
};
