import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react';
import stores from './_stores/index.ts';
import App from './App.tsx'

import './index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider {...stores}>
    <App />
  </Provider>,
)
