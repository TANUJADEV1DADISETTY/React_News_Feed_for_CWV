export interface Author {
  name: string;
  avatarUrl: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  thumbnailUrl: string;
  category: string;
  author: Author;
}

export interface Headline {
  id: number;
  title: string;
  category: string;
  time: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Understanding Core Web Vitals in 2026",
    excerpt: "A deep dive into LCP, CLS, and INP metrics that define modern web performance and user experience.",
    date: "2026-10-18T10:30:00Z",
    thumbnailUrl: "/images/thumb-1.jpg",
    category: "Performance",
    author: {
      name: "Sarah Jenkins",
      avatarUrl: "/images/avatar-1.jpg"
    }
  },
  {
    id: 2,
    title: "Optimizing Next-Gen Web Images for Speed",
    excerpt: "How modern image formats like AVIF and WebP dramatically cut load times without sacrificing fidelity.",
    date: "2026-10-17T14:15:00Z",
    thumbnailUrl: "/images/thumb-2.jpg",
    category: "Design",
    author: {
      name: "Marcus Chen",
      avatarUrl: "/images/avatar-2.jpg"
    }
  },
  {
    id: 3,
    title: "Eliminating Cumulative Layout Shift in React",
    excerpt: "Techniques for reserving space for dynamic ads, lazy widgets, and avoiding abrupt visual jumps.",
    date: "2026-10-16T09:00:00Z",
    thumbnailUrl: "/images/thumb-3.jpg",
    category: "Engineering",
    author: {
      name: "Elena Rostova",
      avatarUrl: "/images/avatar-3.jpg"
    }
  },
  {
    id: 4,
    title: "Main Thread Scheduling with scheduler.postTask",
    excerpt: "Yielding control back to the browser to ensure sub-50ms user input response times under heavy computation.",
    date: "2026-10-15T16:45:00Z",
    thumbnailUrl: "/images/thumb-4.jpg",
    category: "Architecture",
    author: {
      name: "Alex Rivera",
      avatarUrl: "/images/avatar-4.jpg"
    }
  },
  {
    id: 5,
    title: "Tree-Shaking JavaScript Bundles Efficiently",
    excerpt: "Audit and eliminate bloated library imports to reduce parse times and boost Time to Interactive.",
    date: "2026-10-14T11:20:00Z",
    thumbnailUrl: "/images/thumb-5.jpg",
    category: "Tooling",
    author: {
      name: "David Kim",
      avatarUrl: "/images/avatar-5.jpg"
    }
  },
  {
    id: 6,
    title: "Font Display Swap: Beating FOIT and FOUT",
    excerpt: "Practical font loading strategies that keep text readable immediately while web fonts download.",
    date: "2026-10-13T08:10:00Z",
    thumbnailUrl: "/images/thumb-6.jpg",
    category: "Typography",
    author: {
      name: "Priya Patel",
      avatarUrl: "/images/avatar-6.jpg"
    }
  },
  {
    id: 7,
    title: "E-Commerce Conversion Rates & Page Speed",
    excerpt: "Real-world case studies detailing how 100ms improvements directly increase shopping cart checkouts.",
    date: "2026-10-12T13:00:00Z",
    thumbnailUrl: "/images/thumb-7.jpg",
    category: "Business",
    author: {
      name: "Sarah Jenkins",
      avatarUrl: "/images/avatar-1.jpg"
    }
  },
  {
    id: 8,
    title: "Mastering Resource Hints: Preconnect and Preload",
    excerpt: "How to tell the browser what to download ahead of time without clogging network priority queues.",
    date: "2026-10-11T17:30:00Z",
    thumbnailUrl: "/images/thumb-8.jpg",
    category: "Networking",
    author: {
      name: "Marcus Chen",
      avatarUrl: "/images/avatar-2.jpg"
    }
  },
  {
    id: 9,
    title: "React Concurrent Features in Production",
    excerpt: "Leveraging transitions and deferred values for responsive interfaces during complex renders.",
    date: "2026-10-10T12:00:00Z",
    thumbnailUrl: "/images/thumb-9.jpg",
    category: "React",
    author: {
      name: "Elena Rostova",
      avatarUrl: "/images/avatar-3.jpg"
    }
  },
  {
    id: 10,
    title: "Automated Performance Auditing in CI/CD",
    excerpt: "Catching CWV regressions on every pull request using headless Lighthouse and GitHub Actions.",
    date: "2026-10-09T15:40:00Z",
    thumbnailUrl: "/images/thumb-10.jpg",
    category: "DevOps",
    author: {
      name: "Alex Rivera",
      avatarUrl: "/images/avatar-4.jpg"
    }
  },
  {
    id: 11,
    title: "CSS Containment and Rendering Isolation",
    excerpt: "Using content-visibility and contain properties to skip off-screen layout calculations.",
    date: "2026-10-08T18:25:00Z",
    thumbnailUrl: "/images/thumb-11.jpg",
    category: "CSS",
    author: {
      name: "David Kim",
      avatarUrl: "/images/avatar-5.jpg"
    }
  },
  {
    id: 12,
    title: "The Evolution of Interaction to Next Paint",
    excerpt: "Why INP replaced FID as an official Core Web Vital and how to profile long interaction frames.",
    date: "2026-10-07T10:05:00Z",
    thumbnailUrl: "/images/thumb-12.jpg",
    category: "Metrics",
    author: {
      name: "Priya Patel",
      avatarUrl: "/images/avatar-6.jpg"
    }
  }
];

export const sidebarHeadlines: Headline[] = [
  {
    id: 101,
    title: "Google Search Ranking Algorithm updates prioritize visual stability",
    category: "Search",
    time: "20 mins ago"
  },
  {
    id: 102,
    title: "HTTP/3 adoption reaches 35% among top 1 million domains",
    category: "Infrastructure",
    time: "1 hour ago"
  },
  {
    id: 103,
    title: "Vite 6 announced with ultra-fast environment API support",
    category: "Tooling",
    time: "3 hours ago"
  },
  {
    id: 104,
    title: "Chrome DevTools introduces enhanced layout shift region markers",
    category: "Browsers",
    time: "5 hours ago"
  },
  {
    id: 105,
    title: "How CDN edge compute reduces Time to First Byte across the globe",
    category: "Cloud",
    time: "8 hours ago"
  },
  {
    id: 106,
    title: "New spec for speculative prerendering enters browser trials",
    category: "Web Standards",
    time: "Yesterday"
  }
];
