import { useState, useEffect } from 'react';

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const itensSalvos = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(itensSalvos);
  }, []);

  const salvarCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const aumentarQuantidade = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].quantidade += 1;
    salvarCarrinho(novoCarrinho);
  };

  const diminuirQuantidade = (index) => {
    const novoCarrinho = [...carrinho];
    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade -= 1;
      salvarCarrinho(novoCarrinho);
    }
  };

  const removerItem = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    salvarCarrinho(novoCarrinho);
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  const gerarMensagemWhatsApp = () => {
    const mensagem = carrinho.map(item => 
      `🍰 ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}`
    ).join('\n');

    const total = calcularTotal();
    const textoFinal = `${mensagem}\n\nTotal: R$ ${total}`;
    const link = `https://wa.me/5599999999999?text=${encodeURIComponent(textoFinal)}`; // troque pelo seu número
    window.open(link, '_blank');
  };

  return (
    <div className="container mt-4">
      <h2>Seu Carrinho</h2>

      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrinho.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.nome}</strong> <br />
                  <span className="text-muted">R$ {item.preco.toFixed(2)} x {item.quantidade} = <strong>R$ {(item.preco * item.quantidade).toFixed(2)}</strong></span>
                </div>

                <div className="btn-group" role="group">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => diminuirQuantidade(index)}>-</button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => aumentarQuantidade(index)}>+</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => removerItem(index)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>

          <h4>Total: R$ {calcularTotal()}</h4>

          <button className="btn btn-success mt-3" onClick={gerarMensagemWhatsApp}>
            Enviar Pedido pelo WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
