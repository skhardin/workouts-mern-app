import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutsContext'
import { RoutinesContextProvider } from './context/RoutinesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutinesContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </RoutinesContextProvider>
  </React.StrictMode>
);
