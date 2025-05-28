import { Link } from 'react-router-dom';

export default function Cardapio() {
  return (
    <div className="container mt-5">
      <h2>Cardápio</h2>
      <p>Escolha uma categoria:</p>
      <div className="row g-3">
        <div className="col-md-4"><Link className="btn btn-outline-pink w-100" to="/cardapio/amanteigados">Amanteigados</Link></div>
        <div className="col-md-4"><Link className="btn btn-outline-pink w-100" to="/cardapio/bolos">Bolos</Link></div>
        <div className="col-md-4"><Link className="btn btn-outline-pink w-100" to="/cardapio/boloslowcarb">Bolos Low Carb</Link></div>
        <div className="col-md-4"><Link className="btn btn-outline-pink w-100" to="/cardapio/docesespeciais">Doces Especiais</Link></div>
        <div className="col-md-4"><Link className="btn btn-outline-pink w-100" to="/cardapio/salgados">Salgados</Link></div>
      </div>
    </div>
  );
}
