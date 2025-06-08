import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import Destaques from '../components/Destaques';

export default function Home() {
  return (
    <>
      <Carousel />

      {/* Convite para o Blog */}
      <div className="container text-center my-5 py-5">
        <h2 className="mb-3 text-pink">Confira nossas receitas especiais!</h2>
        <p className="lead mb-4">
          Aprenda a preparar os doces e salgados favoritos da <strong>Delícias da Tia</strong>.
        </p>
        <Link to="/blog" className="btn btn-lg btn-pink px-4 py-2 shadow">
          Ir para o Blog de Receitas
        </Link>
      </div>

      <Destaques />
    </>
  );
}
