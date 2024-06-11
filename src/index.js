import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // ה-CSS הכללי שלך
import './tailwind.css'; // ה-CSS של Tailwind
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
