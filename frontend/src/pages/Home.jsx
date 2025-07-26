import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import Destaques from '../components/Destaques';

export default function Home() {
  return (
    <>
      <Carousel />

      {/* Convite para o Blog */}
      <div className="convite-area position-relative py-5">
        <div className="container d-flex align-items-center justify-content-between flex-wrap position-relative" style={{ zIndex: 1 }}>

          {/* Texto do convite */}
          <div className="convite-texto" style={{ maxWidth: '500px' }}>
            <h2 className="mb-3 text-pink">Confira nossas receitas especiais!</h2>
            <p className="lead mb-4">
              Aprenda a preparar os doces e salgados favoritos da <strong>Delícias da Tia</strong>.
            </p>
            <Link to="/blog" className="btn btn-lg btn-pink px-4 py-2 shadow">
              Ir para o Blog de Receitas
            </Link>
          </div>

          {/* Círculo decorativo com imagem */}
          <div className="circulo-decorativo">
            <img src="public/img/ImagemFabricia.jpg" alt="Tia" />
          </div>
        </div>
      </div>

      <Destaques />
    </>
  );
}
