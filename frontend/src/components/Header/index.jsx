import './style.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

export default function Header() {
    const logada = localStorage.getItem('logada') === 'true';

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-pink">
            <div className="container">
                <Link className="navbar-brand logo" to="/">
                    <img src="/img/logo.png" alt="logo" className="logo img-fluid" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                        <div></div>
                    </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Início</Link></li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/cardapio" data-bs-toggle="dropdown">Cardápio</Link>
                            <div className="dropdown-menu bg-pink">
                                <Link className="dropdown-item" to="/cardapio/amanteigados">Amanteigados</Link>
                                <Link className="dropdown-item" to="/cardapio/bolos">Bolos</Link>
                                <Link className="dropdown-item" to="/cardapio/boloslowcarb">Bolos Low Carb</Link>
                                <Link className="dropdown-item" to="/cardapio/docesespeciais">Doces Especiais</Link>
                                <Link className="dropdown-item" to="/cardapio/salgados">Salgados</Link>
                            </div>
                        </li>

                        <li className="nav-item"><Link className="nav-link" to="/sobre">Sobre Nós</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contato">Contato</Link></li>

                        {logada && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Área Administrativa</Link>
                            </li>
                        )}
                    </ul>
                </div>


                <div className="social-icons">
                    <a href="https://wa.me/5579998821048?" target="_blank" className="text-decoration-none me-3">
                        <i className="bi bi-whatsapp"></i>
                    </a>
                </div>
            </div>
        </header>
    );
}
