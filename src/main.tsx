import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomeApp from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';

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
