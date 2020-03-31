import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './providers/cart/cart.provider.jsx';
import { Provider as AuthProvider } from './contexts/auth/auth.context';

import './index.css';
import App from './App';

ReactDOM.render(
  <CartProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </CartProvider>,
  document.getElementById('root')
);
