import React from 'react';
// Fix 5: Removed heavy lodash import to drastically reduce bundle size and parse time
import { articles as initialArticles, type Article } from '../mockData';
import ArticleCard from './ArticleCard';
import SkeletonCard from './SkeletonCard';

interface ArticleGridProps {
  isLoading: boolean;
  extraArticles?: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ isLoading, extraArticles = [] }) => {
  const combinedArticles = [...initialArticles, ...extraArticles];

  // Fix 5: Native JavaScript replacement for sorting without library overhead
  const sortedArticles = [...combinedArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (isLoading) {
    return (
      <div className="articles-grid" aria-label="Loading articles">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonCard key={`skeleton-${idx}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="articles-grid">
      {sortedArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;
