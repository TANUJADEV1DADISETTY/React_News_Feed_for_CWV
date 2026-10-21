import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

export function reportVitals(onPerfEntry?: (metric: Metric) => void) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
}

export default reportVitals;
