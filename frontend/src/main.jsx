import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CarrinhoProvider } from './context/CarrinhoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CarrinhoProvider> 
        <App />
      </CarrinhoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
