import './style.css';

export default function Carousel() {
  return (
    <div className="carousel-wrapper">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/img/bolonopoteDestaque1.jpg"
              className="d-block w-100 carousel-img"
              alt="Bolo de pote"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Bolos deliciosos</h5>
              <p>Experimente nossos sabores incríveis.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/img/docedeleiteDestaque2.jpg"
              className="d-block w-100 carousel-img"
              alt="Doces de leite"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Doces especiais</h5>
              <p>Para todos os momentos.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/img/tortasalgadaDestaque3.jpg"
              className="d-block w-100 carousel-img"
              alt="Tortas salgadas"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Tortas incríveis</h5>
              <p>Feitas com amor e carinho.</p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Próximo</span>
        </button>
      </div>
    </div>
  );
}
