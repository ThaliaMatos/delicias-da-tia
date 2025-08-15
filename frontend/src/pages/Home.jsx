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

      {/* Convite para Feedback */}
<div className="convite-area py-5 d-flex justify-content-center align-items-center">
  <div className="container d-flex align-items-center flex-wrap justify-content-center">
    {/* Imagem da Tia */}
    <div className="convite-imagem mb-4 mb-md-0">
      <img
        src="img/dezenhoDaTia.png"
        alt="Feedback"
        style={{
          width: '250px',
          height: '250px',
          objectFit: 'contain',
          borderRadius: '0',
          background: 'transparent',
          marginRight: '1rem'
        }}
      />
    </div>

    {/* Texto do convite */}
    <div className="convite-texto" style={{ maxWidth: '500px' }}>
      <h2 className="mb-3 text-pink text-center">Queremos ouvir você!</h2>
      <p className="lead mb-4 text-center">
        Sua opinião deixa o <strong>Delícias da Tia</strong> ainda mais doce 🍰.
        Conte pra gente o que achou!
      </p>
      <div className="d-flex justify-content-center">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdY7OkgiS3hxWjDe3lpycf6lkVZ8cuiLN7ug5n16A_JNRJlQA/viewform?usp=header"
          target="_blank"
          rel="noreferrer"
          className="btn btn-lg btn-pink px-4 py-2 shadow"
        >
          Enviar Feedback
        </a>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
