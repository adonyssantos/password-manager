import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomeApp from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <CssBaseline />
        <HomeApp />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
