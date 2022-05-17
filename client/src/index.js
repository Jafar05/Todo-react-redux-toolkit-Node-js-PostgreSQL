import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import styled, {createGlobalStyle} from "styled-components";
import './index.css'
const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Global/>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
