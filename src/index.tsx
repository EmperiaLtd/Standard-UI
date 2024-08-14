import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('ui-root') as HTMLElement);

root.render(<App />);

reportWebVitals();
