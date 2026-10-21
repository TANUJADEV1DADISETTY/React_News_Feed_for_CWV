import React from 'react';

// Fix 2: Optimized Hero Image (Fixing LCP)
const Hero: React.FC = () => {
  return (
    <div className="hero-wrapper">
      <img
        src="/hero.webp" // Fix: Use optimized WebP format
        alt="An inspiring hero image for our news feed"
        width={1200} // Fix: Provide intrinsic width
        height={630} // Fix: Provide intrinsic height
        fetchPriority="high" // Fix: Hint to the browser to download this early
        decoding="async" // Fix: Decode off main thread
        // Fix: Removed loading="lazy"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="hero-caption">
        <h2>Global Tech News & Performance Dispatch</h2>
        <p>Breaking down critical front-end web vitals and real-world architectures.</p>
      </div>
    </div>
  );
};

export default Hero;
