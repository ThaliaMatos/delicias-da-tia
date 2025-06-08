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
    return carrinho.map(item =>
      `🍰 ${item.nome} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}`
    ).join('\n');
  };

  const enviarPedido = () => {
    if (carrinho.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    const mensagem = gerarMensagemWhatsApp();
    const total = calcularTotal();
    const textoFinal = `${mensagem}\n\nTotal: R$ ${total}`;

    const link = `https://wa.me/5579998821048?text=${encodeURIComponent(textoFinal)}`;
    window.open(link, '_blank');

    // Limpa o carrinho após envio
    setCarrinho([]);
    localStorage.removeItem('carrinho');
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

                <div className="controle-quantidade">
                  <button className="botao-quantidade" onClick={() => diminuirQuantidade(index)}>-</button>
                  <span>{item.quantidade}</span>
                  <button className="botao-quantidade" onClick={() => aumentarQuantidade(index)}>+</button>
                  <button className="botao-remover" onClick={() => removerItem(index)}>🗑️</button>
                </div>

              </li>
            ))}
          </ul>

          <h4>Total: R$ {calcularTotal()}</h4>

          <button className="btn btn-success mt-3" onClick={enviarPedido}>
            Enviar Pedido pelo WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
