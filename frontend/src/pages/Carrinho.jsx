import { useCarrinho } from '../context/CarrinhoContext';

export default function Carrinho() {
  const { carrinho, atualizarCarrinho } = useCarrinho();

  //salvar o carrinho
  const salvarCarrinho = (novoCarrinho) => {
    atualizarCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  // Aumenta a quantidade 
  const aumentarQuantidade = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].quantidade += 1;
    salvarCarrinho(novoCarrinho);
  };

  // Diminui a quantidade 
  const diminuirQuantidade = (index) => {
    const novoCarrinho = [...carrinho];
    if (novoCarrinho[index].quantidade > 1) {
      novoCarrinho[index].quantidade -= 1;
      salvarCarrinho(novoCarrinho);
    }
  };

  // Remove o item
  const removerItem = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    salvarCarrinho(novoCarrinho);
  };

  // Calcula o total do carrinho 
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  //mensagem que será enviada pelo WhatsApp
  const gerarMensagemWhatsApp = () => {
    return carrinho.map(item =>
      `*${item.nome}* (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}`
    ).join('\n');
  };

  // Envia o pedido pelo WhatsApp e limpa o carrinho
  const enviarPedido = () => {
    if (carrinho.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    const mensagem = gerarMensagemWhatsApp();
    const total = calcularTotal();
    const textoFinal = `${mensagem}\n\n *Total: R$ ${total}*`;

    const link = `https://wa.me/5579998821048?text=${encodeURIComponent(textoFinal)}`;
    window.open(link, '_blank');

    // Limpa o carrinho após envio
    salvarCarrinho([]);
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
                  <span className="text-muted">
                    R$ {item.preco.toFixed(2)} x {item.quantidade} = <strong>R$ {(item.preco * item.quantidade).toFixed(2)}</strong>
                  </span>
                </div>

                <div className="d-flex align-items gap-2">
                <div className="controle-quantidade">
                  <button className="botao-quantidade" onClick={() => diminuirQuantidade(index)}>-</button>
                  <span>{item.quantidade}</span>
                  <button className="botao-quantidade" onClick={() => aumentarQuantidade(index)}>+</button>
                </div>
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
