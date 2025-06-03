import { useState, useEffect } from 'react';

export default function Feedback() {
  const [nome, setNome] = useState('');
  const [comentario, setComentario] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [logada, setLogada] = useState(false);

  // Carrega feedbacks do localStorage ao montar o componente
  useEffect(() => {
    const dados = localStorage.getItem('feedbacks');
    if (dados) {
      setFeedbacks(JSON.parse(dados));
    }

    // Verifica se a tia está logada
    const estaLogada = localStorage.getItem('logada') === 'true';
    setLogada(estaLogada);
  }, []);

  // Salva feedback no localStorage e atualiza estado
  function handleEnviar(e) {
    e.preventDefault();

    if (!nome.trim() || !comentario.trim()) {
      alert('Por favor, preencha nome e comentário.');
      return;
    }

    const novoFeedback = {
      id: Date.now(),
      nome: nome.trim(),
      comentario: comentario.trim(),
      data: new Date().toLocaleString(),
    };

    const novosFeedbacks = [novoFeedback, ...feedbacks];
    setFeedbacks(novosFeedbacks);
    localStorage.setItem('feedbacks', JSON.stringify(novosFeedbacks));

    setNome('');
    setComentario('');
  }

  // Excluir um feedback
  function excluirFeedback(id) {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este feedback?');
    if (!confirmacao) return;

    const atualizados = feedbacks.filter((f) => f.id !== id);
    setFeedbacks(atualizados);
    localStorage.setItem('feedbacks', JSON.stringify(atualizados));
  }

  return (
    <div className="container mt-4">
      <h2>Deixe seu Feedback</h2>

      <form onSubmit={handleEnviar} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Comentário</label>
          <textarea
            className="form-control"
            rows="4"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escreva seu feedback aqui"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar Feedback
        </button>
      </form>

      <h3>Feedbacks recebidos:</h3>
      {feedbacks.length === 0 && <p>Nenhum feedback enviado ainda.</p>}

      <ul className="list-group">
        {feedbacks.map((f) => (
          <li key={f.id} className="list-group-item">
            <strong>{f.nome}</strong>{' '}
            <small className="text-muted">({f.data})</small>
            <p>{f.comentario}</p>

            {/* Botão de excluir visível apenas para a tia logada */}
            {logada && (
              <button
                className="btn btn-sm btn-danger"
                onClick={() => excluirFeedback(f.id)}
              >
                Excluir
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
