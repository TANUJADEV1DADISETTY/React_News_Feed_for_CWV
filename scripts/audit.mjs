import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as chromeLauncher from 'chrome-launcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon'
};

function startServer(port = 4173) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath === '/') reqPath = '/index.html';
      let filePath = path.join(distDir, reqPath);

      if (!fs.existsSync(filePath)) {
        filePath = path.join(distDir, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading file');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        }
      });
    });

    server.listen(port, () => {
      console.log(`Audit server listening at http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function runLighthouse(url, outputPath) {
  const { default: lighthouse } = await import('lighthouse');

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu']
  });

  try {
    const options = {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance'],
      port: chrome.port,
      formFactor: 'mobile',
      throttlingMethod: 'simulate',
      screenEmulation: {
        mobile: true,
        width: 412,
        height: 823,
        deviceScaleFactor: 1.75,
        disabled: false
      },
      throttling: {
        // Slow 4G & 4x CPU slowdown
        rttMs: 150,
        throughputKbps: 1.6 * 1024,
        requestLatencyMs: 150 * 3.75,
        downloadThroughputKbps: 1.6 * 1024 * 0.9,
        uploadThroughputKbps: 750,
        cpuSlowdownMultiplier: 4
      }
    };

    console.log(`Running Lighthouse audit against ${url}...`);
    const runnerResult = await lighthouse(url, options);

    const reportHtml = runnerResult.report;
    const reportPath = path.resolve(__dirname, '..', outputPath);
    fs.writeFileSync(reportPath, reportHtml);
    console.log(`Report saved to ${reportPath}`);

    const audits = runnerResult.lhr.audits;
    const categories = runnerResult.lhr.categories;

    const summary = {
      performanceScore: Math.round(categories.performance.score * 100),
      fcp: audits['first-contentful-paint'].displayValue,
      lcp: audits['largest-contentful-paint'].displayValue,
      cls: audits['cumulative-layout-shift'].displayValue,
      tbt: audits['total-blocking-time'].displayValue,
      tti: audits['interactive'] ? audits['interactive'].displayValue : 'N/A'
    };

    console.log('--- AUDIT SUMMARY ---');
    console.table(summary);
    return summary;
  } finally {
    await chrome.kill();
  }
}

async function main() {
  const outputFile = process.argv[2] || 'lighthouse-report.html';
  const server = await startServer(4173);
  try {
    const summary = await runLighthouse('http://localhost:4173', outputFile);
    // Write summary JSON for easy reference
    const jsonPath = path.resolve(__dirname, '..', outputFile.replace('.html', '.json'));
    fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2));
  } catch (err) {
    console.error('Audit failed:', err);
    process.exit(1);
  } finally {
    server.close();
  }
}

main();
