import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/boxicons-2.1.2/css/boxicons.min.css';
import './assets/css/grid.css'; 
import reportWebVitals from './reportWebVitals';
import Layout from './components/layouts/Layout';   

document.title= 'IOT Dashboard'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
