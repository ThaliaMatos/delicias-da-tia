import './style.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer({ logada, setLogada }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('logada');
    localStorage.removeItem('token');
    setLogada(false);
    navigate('/');
  }

  return (
    <footer className="rodape bg-pink pt-4 pb-2">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* Sobre a loja */}
          <div className="col-md-4 mb-3">
            <h5>Delícias da Tia</h5>
            <p>Doces e salgados feitos com carinho e ingredientes de qualidade!</p>

            <div className="mb-2">
              <Link
                to="https://docs.google.com/forms/d/e/1FAIpQLSdY7OkgiS3hxWjDe3lpycf6lkVZ8cuiLN7ug5n16A_JNRJlQA/viewform?usp=header"
                className="small text-white text-decoration-underline " target='blank'
                style={{ fontWeight: 'bold' }}
              >
                Feedback
              </Link>
              <br />
              <Link
                to="/faq"
                className="small text-white text-decoration-underline"
                style={{ fontWeight: 'bold' }}
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Horário */}
          <div className="col-md-4 mb-3">
            <h5>Horário de Funcionamento</h5>
            <p>Seg a Sex: 08h às 18h</p>
            <p>Sábado: 08h às 12h</p>
          </div>

          {/* Redes sociais */}
          <div className="col-md-4 mb-3">
            <h5>Redes Sociais</h5>
            <a
              href="https://www.instagram.com/deliciasdatia25/"
              className="me-3"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-instagram"></i> Instagram
            </a>
            <br />
            <a
              href="https://wa.me/5579998821048?text=Olá!!!"
              className="me-3"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <div className="container d-flex flex-column align-items-center">
        <p className="text-center mb-1">&copy; 2025 Delícias da Tia. Todos os direitos reservados.</p>

        {logada ? (
          <>
            <p className="small mb-1">Olá, Tia!</p>
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="small text-white text-decoration-underline"
            style={{ fontWeight: 'bold' }}
          >
            Área Administrativa
          </Link>
        )}
      </div>
    </footer>
  );
}
