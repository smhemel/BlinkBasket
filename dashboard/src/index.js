import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import store from './store/index';
import reportWebVitals from './reportWebVitals';

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense>
        <App />
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              background: '#283046',
              color: 'white'
            }
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
