import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomeApp from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <RecoilRoot>
          <CssBaseline />
          <HomeApp />
        </RecoilRoot>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
