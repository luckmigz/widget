import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const weatherWidget = ReactDOM.createRoot(document.getElementById('weather-widget'));
weatherWidget.render(

    <App />
 
);


reportWebVitals();
