import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './toDoList_redux/App.js';
import './index.css';
import { Provider } from 'react-redux';
import store from './toDoList_redux/store.js';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
  <StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </StrictMode>
);