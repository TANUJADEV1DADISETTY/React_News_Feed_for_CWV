import React from 'react';
import { sidebarHeadlines, type Headline } from '../mockData';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar" aria-label="Trending and Breaking Headlines">
      <h3 className="sidebar-heading">Trending Headlines</h3>
      <ul className="sidebar-list">
        {sidebarHeadlines.map((headline: Headline) => (
          <li key={headline.id} className="sidebar-item">
            <a href={`#headline-${headline.id}`} className="sidebar-link">
              {headline.title}
            </a>
            <div className="sidebar-meta">
              <span>{headline.category}</span> &bull; <span>{headline.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
