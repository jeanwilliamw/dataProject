import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalProvider } from './contexts/globalProvider.tsx';
import ApiBanner from './components/apiStatusBanner.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <GlobalProvider>
        <App />
        <ApiBanner />
      </GlobalProvider>
    </Router>
  </React.StrictMode>,
);
