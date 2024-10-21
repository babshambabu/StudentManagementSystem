import React,  { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import App from './App';
import './index.css';
import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Suspense fallback="loading..">
  <Provider store={store}>  {/* Wrap the App component with Provider */}
    <App />
  </Provider>
  </Suspense>
  // </React.StrictMode>
);