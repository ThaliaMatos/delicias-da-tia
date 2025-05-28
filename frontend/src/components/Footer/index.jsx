import './style.css';

export default function Footer() {
    return (
      <footer className="bg-pink  text-white pt-4 pb-2">
        <div className="container text-center text-md-start">
          <div className="row">
            {/* Sobre a loja */}
            <div className="col-md-4 mb-3">
              <h5>Delícias da Tia</h5>
              <p>Doces e salgados feitos com carinho e ingredientes de qualidade!</p>
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
              <a href="https://www.instagram.com/deliciasdatia25/" className="me-3" target="_blank">
                <i className="bi bi-instagram"></i> Instagram
              </a><br />
              <a href="https://wa.me/5579991175958?text=Olá!!!" className="me-3" target="_blank">
                <i className="bi bi-whatsapp "></i> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <p className="text-center mb-0">&copy; 2025 Delícias da Tia. Todos os direitos reservados.</p>
      </footer>
    );
  }
  