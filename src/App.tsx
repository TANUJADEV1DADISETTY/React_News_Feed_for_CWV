import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import ArticleGrid from './components/ArticleGrid';
import Sidebar from './components/Sidebar';
import type { Article } from './mockData';

const AdBanner: React.FC = () => (
  <div className="ad-banner">
    ⚡ Flash Sale: 50% Off Developer Performance Masterclass!
  </div>
);

function App() {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [extraArticles, setExtraArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const scrollTriggerRef = useRef<HTMLDivElement>(null);

  // Fix 4: Deferring Long Tasks (Fixing TTI/TBT)
  // Breaking the heavy task into sub-50ms chunks and deferring via scheduler.postTask / setTimeout
  useEffect(() => {
    const initAnalytics = () => {
      console.log("Simulating heavy analytics initialization ... ");
      const totalDuration = 600;
      const chunkSize = 8; // Small chunk so under 4x CPU slowdown it remains under 35ms (below the 50ms long-task threshold)
      let elapsed = 0;

      const executeChunk = () => {
        const start = performance.now();
        while (performance.now() - start < chunkSize) {
          // Process chunk without blocking the main thread
        }
        elapsed += chunkSize;

        if (elapsed < totalDuration) {
          const win = window as unknown as {
            scheduler?: {
              postTask: (cb: () => void, opts?: { priority: string }) => Promise<unknown>;
            };
          };
          if (win.scheduler && typeof win.scheduler.postTask === 'function') {
            win.scheduler.postTask(executeChunk, { priority: 'background' });
          } else {
            setTimeout(executeChunk, 16);
          }
        } else {
          console.log("Analytics initialized.");
        }
      };

      const win = window as unknown as {
        scheduler?: {
          postTask: (cb: () => void, opts?: { priority: string }) => Promise<unknown>;
        };
      };
      if (win.scheduler && typeof win.scheduler.postTask === 'function') {
        win.scheduler.postTask(executeChunk, { priority: 'background' });
      } else {
        setTimeout(executeChunk, 16);
      }
    };

    // Fix: Defer initial start so it doesn't block component mount or initial render
    const win = window as unknown as {
      scheduler?: {
        postTask: (cb: () => void, opts?: { priority: string }) => Promise<unknown>;
      };
    };

    if (win.scheduler && typeof win.scheduler.postTask === 'function') {
      win.scheduler.postTask(initAnalytics, { priority: 'background' });
    } else {
      setTimeout(initAnalytics, 0);
    }
  }, []);

  // Fix 3 (Part 2): Dynamic ad banner loads after 1.2s, space reserved below
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Skeleton loading state before content is rendered
  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(fetchTimer);
  }, []);

  // Infinite scroll trigger element at the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setTimeout(() => {
            setExtraArticles((prev) => {
              if (prev.length >= 6) {
                setHasMore(false);
                return prev;
              }
              const newItems: Article[] = [
                {
                  id: 100 + prev.length + 1,
                  title: `Additional Feed Story #${prev.length + 1}: Modern Web Architectures`,
                  excerpt: "Expanding your knowledge on browser internals and rendering performance pipelines.",
                  date: new Date(Date.now() - (prev.length + 1) * 86400000).toISOString(),
                  thumbnailUrl: `/images/thumb-${((prev.length + 1) % 12) + 1}.jpg`,
                  category: "Architecture",
                  author: {
                    name: "Alex Rivera",
                    avatarUrl: `/images/avatar-${((prev.length + 1) % 6) + 1}.jpg`
                  }
                }
              ];
              return [...prev, ...newItems];
            });
          }, 300);
        }
      },
      { rootMargin: '100px' }
    );

    const currentTrigger = scrollTriggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <div className="app">
      <header className="site-header">
        <h1 className="site-title">TechPulse Daily</h1>
        <ul className="nav-links">
          <li><a href="#feed">News Feed</a></li>
          <li><a href="#trending">Trending</a></li>
          <li><a href="#performance">Performance</a></li>
        </ul>
      </header>

      <main className="container" id="feed">
        {/* Fix 3: Reserve space for the dynamic banner before it loads to prevent CLS */}
        <div style={{ minHeight: 90, marginBottom: '2rem' }}>
          {showBanner && <AdBanner />}
        </div>

        {/* Hero Section with large image */}
        <Hero />

        {/* Layout Grid: Article cards and Sidebar */}
        <div className="layout-grid">
          <section className="feed-section" aria-label="Main Articles Feed">
            <ArticleGrid isLoading={isLoading} extraArticles={extraArticles} />
            <div ref={scrollTriggerRef} className="infinite-scroll-trigger">
              {hasMore ? "Loading more stories as you scroll..." : "You are all caught up!"}
            </div>
          </section>

          <Sidebar />
        </div>
      </main>
    </div>
  );
}

export default App;
