import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-thumb" />
      <div className="skeleton-text-block">
        <div className="skeleton-line short" />
        <div className="skeleton-line title" />
        <div className="skeleton-line full" />
        <div className="skeleton-line full" />
      </div>
    </div>
  );
};

export default SkeletonCard;
