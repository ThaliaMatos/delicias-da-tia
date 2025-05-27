import './style.css';

export default function Header() {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-pink">
            <div className="container">
                <a className="navbar-brand logo" href="index.html"><img src="./public/img/logo.png" alt="logo" className='logo img-fluid' /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="index.html">Início</a></li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="cardapio.html" data-bs-toggle="dropdown">Cardápio</a>
                            <div className="dropdown-menu bg-pink">
                                <a className="dropdown-item" href="amanteigados.html">Amanteigados</a>
                                <a className="dropdown-item" href="bolos.html">Bolos</a>
                                <a className="dropdown-item" href="boloslowcarb.html">Bolos Low Carb</a>
                                <a className="dropdown-item" href="docesespecias.html">Doces Especiais</a>
                                <a className="dropdown-item" href="salgados.html">Salgados</a>
                            </div>
                        </li>

                        <li className="nav-item"><a className="nav-link" href="sobre.html">Sobre Nós</a></li>
                        <li className="nav-item"><a className="nav-link" href="contato.html">Contato</a></li>

                        <li className="nav-item">
                            <a className="nav-link position-relative" href="#" id="ver-carrinho">
                                <i className="bi bi-cart3"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="contador-carrinho" style={{ display: 'none' }}>0</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
