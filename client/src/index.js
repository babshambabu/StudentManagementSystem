import React,  { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import SuspenseContent from './containers/SuspenseContent';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Suspense fallback={<SuspenseContent />}>
  <Provider store={store}>  {/* Wrap the App component with Provider */}
    <App />
  </Provider>
  </Suspense>
  // </React.StrictMode>
);
reportWebVitals();