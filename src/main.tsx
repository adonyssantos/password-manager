import { BrowserRouter } from 'react-router-dom';
import HomeApp from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HomeApp />
    </BrowserRouter>
  </React.StrictMode>
);
