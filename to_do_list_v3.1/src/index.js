import React from "react";
import ReactDOM from "react-dom/client";
import App from './toDoList_redux/App.js';
import { Provider } from 'react-redux';
import store from './toDoList_redux/store.js';

const root = ReactDOM.createRoot( document.querySelector( '#root' ) );

root.render(

    <Provider store={ store }>
        <App />
    </Provider>

);