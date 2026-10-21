import React from 'react';
import type { Article } from '../mockData';

interface ArticleCardProps {
  article: Article;
}

// Fix 3: Reserved space and explicit dimensions for images to eliminate CLS
const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="article-card">
      <div className="card-image-wrap">
        {/* Fix 3: Explicit width and height attributes */}
        <img
          src={article.thumbnailUrl}
          alt={article.title}
          width={300}
          height={200}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="card-content">
        <span className="card-tag">{article.category}</span>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-excerpt">{article.excerpt}</p>
        <div className="card-author">
          {/* Fix 3: Explicit width and height attributes */}
          <img
            className="avatar"
            src={article.author.avatarUrl}
            alt={article.author.name}
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
          <div className="author-info">
            <span className="author-name">{article.author.name}</span>
            <span className="article-date">
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
