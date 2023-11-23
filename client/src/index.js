import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Redux Persist is used to persist the state in the browser. This is so that when the user refreshes the page or closes the page, the state will not be lost.
import { presistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'; // Only have to do this when using redux-persist. This is the persistReducer function that will be used to create the persistor.
import storage from 'redux-persist/lib/storage'; // This is the storage that will be used to store the state.
import { PersistGate } from 'redux-persist/integration/react'; // This is the PersistGate component that will be used to wrap the App component.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);