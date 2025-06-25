import './style.css';
import { useCarrinho } from '../../context/CarrinhoContext';
import { useNavigate } from 'react-router-dom';

export default function BotaoCarrinhoFlutuante() {
  const { carrinho } = useCarrinho();
  const navigate = useNavigate();

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  const totalPreco = carrinho
    .reduce((total, item) => total + item.preco * item.quantidade, 0)
    .toFixed(2);

  if (totalItens === 0) return null;

  return (
    <div className="botao-flutuante-wrapper">
      <span className="badge-cima">{totalItens}</span>
      <button className="botao-flutuante" onClick={() => navigate('/carrinho')}>
        <i className="bi bi-cart3 fs-4 text-white"></i>
      </button>
      <span className="badge-baixo">R$ {totalPreco}</span>
    </div>
  );
}
