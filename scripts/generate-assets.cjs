const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const publicDir = path.resolve(__dirname, '../public');
  const imgDir = path.resolve(publicDir, 'images');

  if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
  }

  console.log('Generating hero.png (>2MB) and hero.webp (<50KB)...');
  const heroWidth = 1920;
  const heroHeight = 1080;

  // Create an attractive editorial tech SVG
  const svg = `
    <svg width="${heroWidth}" height="${heroHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="40%" style="stop-color:#1e293b;stop-opacity:1" />
          <stop offset="70%" style="stop-color:#1e3a8a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#1e3a8a;stop-opacity:0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#skyGrad)" />
      <circle cx="960" cy="540" r="450" fill="url(#glow)" />
      
      <!-- Architectural Grid Lines -->
      <g stroke="rgba(255,255,255,0.08)" stroke-width="2">
        <line x1="0" y1="270" x2="1920" y2="270" />
        <line x1="0" y1="540" x2="1920" y2="540" />
        <line x1="0" y1="810" x2="1920" y2="810" />
        <line x1="480" y1="0" x2="480" y2="1080" />
        <line x1="960" y1="0" x2="960" y2="1080" />
        <line x1="1440" y1="0" x2="1440" y2="1080" />
      </g>

      <!-- Center Card Graphic -->
      <rect x="660" y="360" width="600" height="360" rx="20" fill="rgba(15, 23, 42, 0.85)" stroke="#38bdf8" stroke-width="3" />
      <text x="960" y="480" text-anchor="middle" fill="#ffffff" font-size="52" font-family="Arial, sans-serif" font-weight="900" letter-spacing="2">TECH PULSE 2026</text>
      <text x="960" y="550" text-anchor="middle" fill="#38bdf8" font-size="28" font-family="Arial, sans-serif" font-weight="bold">Core Web Vitals Engineering Report</text>
      <text x="960" y="620" text-anchor="middle" fill="#94a3b8" font-size="20" font-family="Arial, sans-serif">LCP &#8226; CLS &#8226; INP &#8226; FCP &#8226; TTI Benchmarks</text>
    </svg>
  `;

  const heroSvgBuffer = Buffer.from(svg);
  const rawImage = await sharp(heroSvgBuffer).toBuffer();

  // Create >2MB PNG with uncompressed metadata/padding or compressionLevel 0
  const heroPngPath = path.join(publicDir, 'hero.png');
  // To ensure PNG is solidly >2MB without degrading image fidelity, we use a 2400x1350 raster at compressionLevel 0
  await sharp(heroSvgBuffer)
    .resize(2560, 1440)
    .png({ compressionLevel: 0 })
    .toFile(heroPngPath);

  // If size is below 2.1MB, pad with metadata chunk to guarantee > 2MB
  let pngStats = fs.statSync(heroPngPath);
  if (pngStats.size < 2.2 * 1024 * 1024) {
    const padding = Buffer.alloc(2.5 * 1024 * 1024 - pngStats.size);
    fs.appendFileSync(heroPngPath, padding);
    pngStats = fs.statSync(heroPngPath);
  }
  console.log(`hero.png size: ${(pngStats.size / (1024 * 1024)).toFixed(2)} MB`);

  // Create optimized WebP version (clean ~40KB)
  const heroWebpPath = path.join(publicDir, 'hero.webp');
  await sharp(heroSvgBuffer)
    .resize(1200, 675)
    .webp({ quality: 80, effort: 6 })
    .toFile(heroWebpPath);

  const webpStats = fs.statSync(heroWebpPath);
  console.log(`hero.webp size: ${(webpStats.size / 1024).toFixed(2)} KB`);

  // Generate 12 article thumbnails
  console.log('Generating 12 thumbnails...');
  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899',
    '#06b6d4', '#84cc16', '#6366f1', '#14b8a6', '#f97316', '#a855f7'
  ];

  for (let i = 1; i <= 12; i++) {
    const color = colors[(i - 1) % colors.length];
    const thumbSvg = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}" />
        <circle cx="300" cy="200" r="80" fill="rgba(255,255,255,0.2)" />
        <text x="50%" y="45%" text-anchor="middle" fill="#ffffff" font-size="36" font-family="Arial" font-weight="bold">Tech News #${i}</text>
        <text x="50%" y="60%" text-anchor="middle" fill="#f1f5f9" font-size="20" font-family="Arial">Core Web Vitals Special Edition</text>
      </svg>
    `;
    await sharp(Buffer.from(thumbSvg))
      .resize(300, 200)
      .jpeg({ quality: 80 })
      .toFile(path.join(imgDir, `thumb-${i}.jpg`));
  }

  // Generate 6 avatars
  console.log('Generating 6 avatars...');
  for (let i = 1; i <= 6; i++) {
    const avatarColor = colors[(i * 2) % colors.length];
    const avatarSvg = `
      <svg width="96" height="96" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${avatarColor}" rx="48" />
        <circle cx="48" cy="38" r="18" fill="#ffffff" />
        <path d="M 24 80 Q 48 55 72 80 Z" fill="#ffffff" />
      </svg>
    `;
    await sharp(Buffer.from(avatarSvg))
      .resize(48, 48)
      .jpeg({ quality: 80 })
      .toFile(path.join(imgDir, `avatar-${i}.jpg`));
  }

  console.log('All image assets created successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
