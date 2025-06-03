import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Feedback from './pages/Feedback';
import BlogReceitas from './pages/BlogReceitas';
import Faq from './pages/Faq';

function App() {
  return (
    <>
    <div className="app-container">
      <Header />
      <main className='main-content'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/cardapio/:categoria" element={<Categoria />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/blog" element={<BlogReceitas />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        {/* outras rotas */}
      </Routes>
      </main>
      <Footer />
      </div>
    </>
  );
}

export default App;
