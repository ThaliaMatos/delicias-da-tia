import { useParams } from 'react-router-dom';

const produtosFake = {
  bolos: [
    { nome: "Bolo de chocolate", preco: "R$ 15,00", img: "/img/bolo.jpg" },
    { nome: "Bolo de cenoura", preco: "R$ 14,00", img: "/img/cenoura.jpg" },
  ],
  amanteigados: [
    { nome: "Biscoito de leite", preco: "R$ 5,00", img: "/img/biscoito.jpg" },
  ],
  // adicione as outras categorias
};

export default function Categoria() {
  const { categoria } = useParams();
  const produtos = produtosFake[categoria] || [];

  return (
    <div className="container mt-4">
      <h2>{categoria.toUpperCase()}</h2>
      <div className="row">
        {produtos.map((produto, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-4">
              <img src={produto.img} className="card-img-top" alt={produto.nome} />
              <div className="card-body">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text">{produto.preco}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
