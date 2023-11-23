import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state/authSlice';

/* Got this code from https://redux-toolkit.js.org/tutorials/intermediate-tutorial */
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Redux Persist is used to persist the state in the browser. This is so that when the user refreshes the page or closes the page, the state will not be lost.
import { presistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'; // Only have to do this when using redux-persist. This is the persistReducer function that will be used to create the persistor.
import storage from 'redux-persist/lib/storage'; // This is the storage that will be used to store the state.
import { PersistGate } from 'redux-persist/integration/react'; // This is the PersistGate component that will be used to wrap the App component.

const persistConfig = { key: "root", storage, version: 1 }; // This is the persistConfig object that will be used to create the persistor.
const persistedReducer = persistReducer(persistConfig, authReducer); // This is the persistedReducer that will be used to create the store.
const store = configureStore({ // This is the store that will be used to store the state.
  reducer: persistedReducer, // This is the reducer that will be used to update the state.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ // This is the middleware that will be used to handle the actions.
    serializableCheck: { // This is the serializableCheck that will be used to check if the action is serializable.
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // These are the actions that will be ignored.
    },
  }),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={presistStore(store)}>
        <App />
      </PersistGate>
    </Provider> // Add closing tag for Provider
  </React.StrictMode>
);