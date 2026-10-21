import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { reportVitals } from './reportVitals';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportVitals(metric => {
  console.table({
    name: metric.name,
    value: metric.value.toFixed(1),
    rating: metric.rating
  });
});
