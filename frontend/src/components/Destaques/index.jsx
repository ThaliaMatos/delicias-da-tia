import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../../context/CarrinhoContext';
import './style.css';

export default function Destaques() {
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [mensagem, setMensagem] = useState('');
  const { adicionarProduto } = useCarrinho();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/produto.json')
      .then((res) => {
        const destaques = res.data.slice(0, 3);
        setProdutos(destaques);

        const quantidadesIniciais = {};
        destaques.forEach(p => quantidadesIniciais[p.id] = 1);
        setQuantidades(quantidadesIniciais);
      })
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  const alterarQuantidade = (id, novaQtd) => {
    if (novaQtd < 1) return;
    setQuantidades({ ...quantidades, [id]: novaQtd });
  };

  const adicionarAoCarrinho = (produto) => {
    const qtd = quantidades[produto.id] || 1;
    adicionarProduto(produto, qtd);

    setMensagem(`Adicionado ao carrinho!`);
    setTimeout(() => setMensagem(''), 1000);
  };

  return (
    <div className="destaques-container py-5 mt-5">
      {mensagem && (
        <div className="toast-mensagem">
          <span>{mensagem}</span>
          <div className="barra-progresso"></div>
        </div>
      )}
      <div className="container">
        <h2 className="text-center mb-4 text-white">Destaques da Tia</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {produtos.map((produto) => (
            <div className="col" key={produto.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={produto.imagem}
                  className="card-img-top"
                  alt={produto.nome}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{produto.nome}</h5>
                  <p className="card-text flex-grow-1">{produto.descricao}</p>

                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                    <p className="preco-produto mb-2 me-auto fw-bold">
                      R$ {produto.preco.toFixed(2)}
                    </p>

                    <div className="controle-quantidade d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          alterarQuantidade(produto.id, (quantidades[produto.id] || 1) - 1)
                        }
                      >
                        −
                      </button>

                      <span className="mx-2">{quantidades[produto.id] || 1}</span>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          alterarQuantidade(produto.id, (quantidades[produto.id] || 1) + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-pink mt-auto"
                    onClick={() => adicionarAoCarrinho(produto)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
