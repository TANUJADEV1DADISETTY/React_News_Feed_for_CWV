# Core Web Vitals Optimization: React News Feed

A comprehensive hands-on exploration of frontend web performance engineering, following a systematic **"Break it, then fix it"** methodology. This project demonstrates how identifying, diagnosing, and refactoring performance anti-patterns directly impacts Google's Core Web Vitals (CWV)—specifically **LCP**, **CLS**, **FCP**, and **TBT/TTI**.

---

## Core Web Vitals Performance Report

The audits were conducted using Google Lighthouse under standard mobile simulation guidelines (**Mobile device emulation, Slow 4G network throttling, 4x CPU slowdown**).

| Metric | v1 Broken | v2 Fixed | Improvement (%) |
| :--- | :--- | :--- | :--- |
| **FCP (First Contentful Paint)** | 3.6 s | 2.3 s | **36.1% faster** |
| **LCP (Largest Contentful Paint)** | 47.6 s | 2.3 s | **95.2% faster** |
| **CLS (Cumulative Layout Shift)** | 0.115 | 0.000 | **100.0% reduction** |
| **TTI (Time to Interactive)** | 47.6 s | 3.0 s | **93.7% faster** |
| **TBT (Total Blocking Time)** | 2,360 ms | 10 ms | **99.6% reduction** |
| **Performance Score** | **35 / 100** | **96 / 100** | **+174.3% gain** |

---

## Performance Anti-Patterns vs. Systematic Fixes

### 1. Anti-Pattern 1: Render-Blocking Fonts & CSS (FCP Killer)
- **Problem**: Naive synchronous `<link rel="stylesheet">` tags in `<head>` halt HTML parsing and critical rendering path until remote font stylesheets and unminified CSS are completely downloaded and parsed.
- **Fix**:
  - Implemented `preconnect` hints for `https://fonts.googleapis.com` and `https://fonts.gstatic.com`.
  - Loaded Google Fonts asynchronously with `media="print" onload="this.media='all'"`, accompanied by a `<noscript>` fallback.
  - Enabled `display=swap` to eliminate invisible text flashes (FOIT).

### 2. Anti-Pattern 2: Unoptimized Hero Image (LCP Killer)
- **Problem**: The above-the-fold hero image was served as an 8+ MB uncompressed PNG with `loading="lazy"` and omitted intrinsic dimensions, severely delaying LCP and triggering layout shift.
- **Fix**:
  - Converted the image to modern, highly compressed **WebP** format.
  - Added explicit intrinsic dimensions (`width={1200} height={630}`).
  - Removed `loading="lazy"` and added `fetchPriority="high"` with `decoding="async"`.
  - Added `<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">` in `<head>` for immediate network discovery.

### 3. Anti-Pattern 3: Layout Shift from Dynamic Content (CLS Killer)
- **Problem**:
  - Dynamic announcement ad banner injected after 1.2s without reserved vertical space, pushing the feed down.
  - Article cards and author avatars rendered without `width` and `height` dimensions.
- **Fix**:
  - Wrapped dynamic banner inside a reserved layout container with `min-height: 90px`.
  - Assigned explicit `width={300} height={200}` to thumbnail images and `width={48} height={48}` to author avatars.

### 4. Anti-Pattern 4: Long Synchronous Task on Mount (TTI / TBT Killer)
- **Problem**: A synchronous 600ms blocking spin-lock inside `useEffect` on initial mount froze the browser's single main thread, causing severe Total Blocking Time and delaying user interactivity.
- **Fix**:
  - Replaced the monolithic thread-blocking operation with a non-blocking scheduler.
  - Utilized modern `scheduler.postTask(..., { priority: 'background' })` with fallback to `setTimeout`.
  - Divided computational work into small sub-50ms chunks, allowing the browser event loop to breathe and handle input interactions smoothly.

### 5. Anti-Pattern 5: Heavy Library Import for a Single Operation (Bundle Size Killer)
- **Problem**: Importing the entire monolithic `lodash` library (`import _ from 'lodash'`) just to sort an array added ~71 KB gzipped JavaScript overhead and extended script parse/evaluation time.
- **Fix**:
  - Removed the `lodash` package dependency entirely.
  - Re-implemented the date sorting logic using native JavaScript `Array.prototype.sort()`.
  - Generated bundle treemap analysis via `rollup-plugin-visualizer` (`bundle-stats.html`).

---

## Application Features & Architecture

1. **Editorial News Feed Layout**:
   - Header with site branding and navigation links.
   - High-fidelity Hero section highlighting lead stories.
   - Responsive multi-column layout with 12 detailed article cards (category tags, titles, excerpts, author avatars, and formatted publication dates).
   - Sidebar containing trending headlines and category timestamps.
   - Skeleton screens displaying animated placeholder UI elements during simulated data loading.
   - Infinite scroll sentinel with intersection observation.

2. **Core Web Vitals Real User Monitoring (RUM)**:
   - Encapsulated in `src/reportVitals.ts` using the official `web-vitals` library.
   - Real-time logging of `CLS`, `FCP`, `INP`, `LCP`, and `TTFB` via `console.table` on page load.

---

## Project Structure

```text
react-cwv-task/
├── index.html                   # Entry HTML with resource hints and font loading
├── vite.config.ts               # Vite configuration with rollup-plugin-visualizer
├── bundle-stats.html            # JavaScript bundle composition treemap report
├── lighthouse-v1-broken.html    # Full baseline Lighthouse report (v1-broken, Score: 35)
├── lighthouse-v2-fixed.html     # Full optimized Lighthouse report (v2-fixed, Score: 96)
├── public/
│   ├── hero.png                 # Unoptimized large photographic PNG (>2MB)
│   ├── hero.webp                # Optimized WebP image
│   ├── styles/main.css          # Feed layout stylesheet
│   └── images/                  # Article thumbnails & author avatars
├── scripts/
│   ├── generate-assets.cjs      # Asset generator for responsive images
│   └── audit.mjs                # Headless Lighthouse audit runner
└── src/
    ├── components/
    │   ├── Hero.tsx             # Hero banner component
    │   ├── ArticleCard.tsx      # Individual article card with image dimensions
    │   ├── ArticleGrid.tsx      # Article grid with skeleton loading state
    │   ├── Sidebar.tsx          # Trending headlines sidebar
    │   └── SkeletonCard.tsx     # Skeleton loading placeholder
    ├── mockData.ts              # Mock article dataset & headlines
    ├── reportVitals.ts          # Core Web Vitals instrumentation
    ├── App.tsx                  # Main layout, ad banner, and postTask scheduler
    └── main.tsx                 # React entry point with vitals reporting
```

---

## Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production & Bundle Analysis**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

5. **Run Automated Lighthouse Performance Audits**:
   ```bash
   node scripts/audit.mjs lighthouse-v2-fixed.html
   ```
