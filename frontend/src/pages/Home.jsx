import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

export default function Home() {
  return (
    <div className="container mt-4">
      <Carousel />

      <div className="text-center mt-5">
        <h2>Confira nossas receitas especiais!</h2>
        <p className="mb-3">Aprenda a preparar os doces e salgados favoritos da Delícias da Tia.</p>
        <Link to="/blog" className="btn btn-outline-pink btn-lg">
          Ir para o Blog de Receitas
        </Link>
      </div>
    </div>
  );
}
