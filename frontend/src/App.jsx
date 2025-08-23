import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Carrinho from './pages/Carrinho';
import Categoria from './pages/Categoria';
import BlogReceitas from './pages/BlogReceitas';
import Faq from './pages/Faq';
import BotaoCarrinhoFlutuante from './components/BotaoCarrinhoFlutuante/index';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [logada, setLogada] = useState(localStorage.getItem('logada') === 'true');

  const fazerLogout = () => {
    localStorage.removeItem('logada');
    setLogada(false);
  };

  useEffect(() => {
    const verificaLogin = () => {
      const estaLogada = localStorage.getItem('logada') === 'true';
      setLogada(estaLogada);
    };

    verificaLogin(); // verifica logo ao carregar
    window.addEventListener('storage', verificaLogin); // caso outra aba mude o localStorage

    return () => window.removeEventListener('storage', verificaLogin);
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/cardapio/:categoria" element={<Categoria />} />
          <Route path="/sobre" element={<Sobre />} />
          {/* <Route path="/contato" element={<Contato />} /> */}
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/blog" element={<BlogReceitas />} />
          <Route path="/faq" element={<Faq />} />

          <Route path="/home" element={<Navigate to="/" />} />


          {/* Rota protegida da área administrativa */}
          <Route
            path="/admin"
            element={
              <PrivateRoute logada={logada}>
                <Admin />
              </PrivateRoute>
            }
          />

          {/* Login da tia */}
          <Route path="/login" element={<Login setLogada={setLogada} />} />
          
        </Routes>
      </main>

      <BotaoCarrinhoFlutuante />
      <Footer logada={logada} setLogada={setLogada} />
    </div>
  );
}

export default App;
