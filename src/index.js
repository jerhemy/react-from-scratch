import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

if (module.hot) {
  module.hot.accept();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
