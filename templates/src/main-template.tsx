import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App.tsx';
import './index.css';
import {{domainCamelCase}} from "./features/{{domainCamelCase}}/{{domainCamelCase}}Slice";
import {{domainCamelCase}}s from "./features/{{domainCamelCase}}/{{domainCamelCase}}sSlice";
import { configureStore } from "@reduxjs/toolkit";
import {HashRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';


export const store = configureStore({
  reducer: {
    {{domainCamelCase}},
    {{domainCamelCase}}s,
  },
});

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <StrictMode>
  <CssBaseline />
  <HashRouter>
    <App />
  </HashRouter>
  </StrictMode>
  </Provider>,
)
