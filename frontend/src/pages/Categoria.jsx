import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Categoria() {
  const { categoria } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/public/produto.json')
      .then(res => res.json())
      .then(data => {
        const filtrados = data.filter(p => p.categoria === categoria);
        setProdutos(filtrados);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar produtos:', err);
        setLoading(false);
      });
  }, [categoria]);

  if (loading) {
    return <div className="container mt-4">Carregando produtos...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>{categoria.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()}</h2>
      <div className="row">
        {produtos.length === 0 && <p>Nenhum produto encontrado para essa categoria.</p>}

        {produtos.map((produto) => (
          <div className="col-md-4" key={produto.id}>
            <div className="card mb-4">
              <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
              <div className="card-body">
                <h5 className="card-title">{produto.nome}</h5>
                <p className="card-text">{produto.descricao}</p>
                <p className="card-text fw-bold">R$ {produto.preco.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
