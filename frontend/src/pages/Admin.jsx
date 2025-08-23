import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CATEGORIAS_FIXAS = [
  'Amanteigados',
  'Bolo',
  'Bolo Low Carb',
  'Doces Especiais',
  'Salgados',
];

export default function Admin() {
  const navigate = useNavigate();
  const [secao, setSecao] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');

  const [idEditar, setIdEditar] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagemBase64, setImagemBase64] = useState('');
  const [categoria, setCategoria] = useState('');

  const [destaquesSelecionados, setDestaquesSelecionados] = useState(() => {
    const salvos = localStorage.getItem('destaques');
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    const estaLogada = localStorage.getItem('logada') === 'true';
    if (!estaLogada) {
      navigate('/login');
      return;
    }
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3333/api/produtos', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProdutos(res.data))
      .catch(() => alert('Erro ao carregar produtos'));
  }, [navigate]);

  function handleImagemChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagemBase64(reader.result.toString());
    reader.readAsDataURL(file);
  }

  function limparFormulario() {
    setIdEditar(null);
    setNome('');
    setDescricao('');
    setImagemBase64('');
    setCategoria('');
    setPreco('');
  }

  async function handleSalvarProduto(e) {
    e.preventDefault();

    if (!nome || !descricao || !categoria || !preco) {
      alert('Preencha todos os campos');
      return;
    }

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('categoria', categoria);
    formData.append('preco', preco);

    const imagemFile = e.target.img?.files[0];
    if (imagemFile) {
      formData.append('img', imagemFile);
    }

    try {
      let res;

      if (idEditar !== null) {
        res = await axios.put(
          `http://localhost:3333/api/produtos/${idEditar}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        res = await axios.post('http://localhost:3333/api/produtos', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      const produtoAtualizado = res.data;

      setProdutos((produtosAntigos) => {
        if (idEditar !== null) {
          return produtosAntigos.map((p) =>
            p.id === idEditar ? produtoAtualizado : p
          );
        }
        return [...produtosAntigos, produtoAtualizado];
      });

      alert(idEditar !== null ? 'Produto atualizado!' : 'Produto cadastrado!');
      limparFormulario();
      setSecao('ver');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar produto');
    }
  }


  function handleEditarProduto(produto) {
    setSecao('cadastrar');
    setIdEditar(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setImagemBase64(produto.imagem ? `http://localhost:3333/uploads/${produto.imagem}` : '');
    setCategoria(produto.categoria);
    setPreco(produto.preco);
  }

  async function handleExcluirProduto(id) {
    if (!window.confirm('Deseja excluir este produto?')) return;
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3333/api/produtos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos((prodAnt) => prodAnt.filter((p) => p.id !== id));
      alert('Produto excluído!');

      if (destaquesSelecionados.includes(id)) {
        const novos = destaquesSelecionados.filter((pid) => pid !== id);
        setDestaquesSelecionados(novos);
        localStorage.setItem('destaques', JSON.stringify(novos));
      }
    } catch (err) {
      alert('Erro ao excluir');
    }
  }

  function alternarDestaque(id) {
    let novos;
    if (destaquesSelecionados.includes(id)) {
      novos = destaquesSelecionados.filter((pid) => pid !== id);
    } else {
      if (destaquesSelecionados.length >= 3) {
        alert('Máximo de 3 destaques!');
        return;
      }
      novos = [...destaquesSelecionados, id];
    }
    setDestaquesSelecionados(novos);
    localStorage.setItem('destaques', JSON.stringify(novos));
  }

  function renderConteudo() {
    if (secao === 'cadastrar') {
      return (
        <div className="form-box">
          <h4 className="mb-4 text-center" style={{ color: '#a20566' }}>
            {idEditar ? 'Editar Produto' : 'Cadastrar Produto'}
          </h4>
          <form onSubmit={handleSalvarProduto}>
            <div className="mb-3">
              <label className="form-label">Nome do Produto</label>
              <input
                type="text"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                rows="3"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Categoria</label>
              <select
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {CATEGORIAS_FIXAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Preço (R$)</label>
              <input
                type="number"
                className="form-control"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
                step="0.01"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagem</label>
              <input
                type="file"
                name="img"
                className="form-control"
                accept="image/*"
                onChange={handleImagemChange}
              />
              {imagemBase64 && (
                <img src={imagemBase64} className="preview-imagem mt-2" alt="Preview" style={{ maxWidth: '100%' }} />
              )}
            </div>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-tia px-4">
                {idEditar ? 'Atualizar' : 'Salvar'}
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => {
                  limparFormulario();
                  setSecao('ver');
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      );
    }

    if (secao === 'ver') {
      const categoriasUnicas = ['todas', ...CATEGORIAS_FIXAS];
      const produtosFiltrados =
        categoriaFiltro === 'todas'
          ? produtos
          : produtos.filter((p) => p.categoria === categoriaFiltro);

      return (
        <div className="mt-4">
          <h4>Produtos Cadastrados</h4>
          <div className="mb-3">
            <label className="form-label">Filtrar por categoria:</label>
            <select
              className="form-select"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              {categoriasUnicas.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'todas' ? 'Todas as categorias' : cat}
                </option>
              ))}
            </select>
          </div>
          <div className="row g-4">
            {produtosFiltrados.map((p) => (
              <div className="col-md-4" key={p.id}>
                <div className="card h-100 d-flex flex-column shadow">
                  <img
                    src={p.imagem ? `http://localhost:3333/uploads/${p.imagem}` : 'https://via.placeholder.com/300x200'}
                    alt={p.nome}
                    style={{ maxHeight: '300px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.nome}</h5>
                    <p className="card-text">{p.descricao}</p>
                    <span className="badge bg-secondary">{p.categoria}</span>
                    <p className="mt-2 fw-bold">R$ {parseFloat(p.preco).toFixed(2)}</p>
                    <div className="mt-auto d-flex gap-2">
                      <button className="btn btn-sm btn-primary" onClick={() => handleEditarProduto(p)}>
                        ✏️ Editar
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleExcluirProduto(p.id)}>
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {produtosFiltrados.length === 0 && (
              <p className="text-muted">Nenhum produto nesta categoria.</p>
            )}
          </div>
        </div>
      );
    }

    if (secao === 'destaques') {
      return (
        <div className="mt-4">
          <h4>Escolha até 3 produtos para destacar</h4>
          <div className="row g-4 mt-3">
            {produtos.map((p) => {
              const selecionado = p.destaque; // agora vem do banco
              return (
                <div className="col-md-4" key={p.id}>
                  <div className={`card h-100 shadow ${selecionado ? 'border border-success border-3' : ''}`}>
                    <img
                      src={p.imagem ? `http://localhost:3333/uploads/${p.imagem}` : 'https://via.placeholder.com/300x200'}
                      alt={p.nome}
                      style={{ maxHeight: '300px', objectFit: 'cover' }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{p.nome}</h5>
                      <button
  className={`btn ${selecionado ? 'btn-danger' : 'btn-primary'}`}
  onClick={async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:3333/api/produtos/destaque/${p.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // atualiza o estado local
      setProdutos((produtosAnt) =>
        produtosAnt.map((prod) => (prod.id === p.id ? res.data : prod))
      );
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || 'Erro ao atualizar destaque';
      alert(msg);
    }
  }}
>
  {selecionado ? 'Remover' : 'Selecionar'}
</button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }


    return <p className="text-muted mt-3">Escolha uma ação acima.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-5" style={{ color: '#a20566' }}>
        Painel Administrativo da Tia
      </h2>

      <div className="row justify-content-center g-4 mb-4">
        {[
          { titulo: 'Cadastrar Produto', icone: '📥', acao: () => { limparFormulario(); setSecao('cadastrar'); }, desc: 'Adicione novas delícias ao cardápio' },
          { titulo: 'Ver Produtos', icone: '📋', acao: () => setSecao('ver'), desc: 'Visualize os produtos cadastrados' },
          { titulo: 'Escolher Destaques', icone: '🌟', acao: () => setSecao('destaques'), desc: 'Selecione produtos para a vitrine' },
        ].map(({ titulo, icone, acao, desc }, i) => (
          <div key={i} className="col-md-6 col-lg-4" onClick={acao} style={{ cursor: 'pointer' }}>
            <div className="card-admin text-center">
              <div className="card-admin-icon">{icone}</div>
              <div className="card-admin-title">{titulo}</div>
              <div className="card-admin-desc">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {renderConteudo()}
    </div>
  );
}
