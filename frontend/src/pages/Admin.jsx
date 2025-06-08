import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// Categorias fixas
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

  // Estados do formulário
  const [idEditar, setIdEditar] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagemBase64, setImagemBase64] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    const estaLogada = localStorage.getItem('logada') === 'true';
    if (!estaLogada) {
      navigate('/login');
    } else {
      axios
      .get('/produto.json')
      .then((res) => setProdutos(res.data))
      .catch(() => alert('Erro ao carregar produtos'));
    }
  }, [navigate]);

  function handleImagemChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagemBase64(reader.result.toString());
    };
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

  function handleSalvarProduto(e) {
    e.preventDefault();

    if (!nome || !descricao || !categoria) {
      alert('Preencha todos os campos');
      return;
    }

    if (idEditar !== null) {
      // Editar produto existente
      setProdutos((produtosAntigos) =>
        produtosAntigos.map((p) =>
          p.id === idEditar
            ? {
                ...p,
                nome,
                descricao,
                preco,
                imagem: imagemBase64 || p.imagem,
                categoria,
              }
            : p
        )
      );
      alert('Produto atualizado com sucesso!');
    } else {
      // Cadastrar novo produto
      const novoProduto = {
        id: produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1,
        nome,
        descricao,
        preco: parseFloat(preco).toFixed(2),
        imagem: imagemBase64 || 'https://via.placeholder.com/300x200',
        categoria,
      };
      setProdutos([...produtos, novoProduto]);
      alert('Produto cadastrado com sucesso!');
    }

    limparFormulario();
    setSecao('ver');
  }

  function handleEditarProduto(produto) {
    setSecao('cadastrar');
    setIdEditar(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setImagemBase64(produto.imagem);
    setCategoria(produto.categoria);
    setPreco(produto.preco);
  }

  function handleExcluirProduto(id) {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter((p) => p.id !== id));
      if (secao === 'ver') {
        alert('Produto excluído com sucesso!');
      }
    }
  }

  function renderConteudo() {
    if (secao === 'cadastrar') {
      return (
        <div className="card p-4 mt-4 shadow">
          <h4 className="mb-3">{idEditar !== null ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h4>
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
                <option value="">Selecione uma categoria</option>
                {CATEGORIAS_FIXAS.map((cat, i) => (
                  <option key={i} value={cat}>
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
                min="0"
                step="0.01"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagem do Produto</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImagemChange}
              />
              {imagemBase64 && (
                <img
                  src={imagemBase64}
                  alt="Preview"
                  style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }}
                />
              )}
            </div>
            <button type="submit" className="btn btn-tia me-2">
              {idEditar !== null ? 'Atualizar' : 'Salvar'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                limparFormulario();
                setSecao('ver');
              }}
            >
              Cancelar
            </button>
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
              {categoriasUnicas.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat === 'todas' ? 'Todas as categorias' : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            {produtosFiltrados.map((produto) => (
              <div className="col-md-4" key={produto.id}>
                <div className="card shadow-sm mb-3">
                  <img
                    src={produto.imagem}
                    className="card-img-top"
                    alt={produto.nome}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text">{produto.descricao}</p>
                    <span className="badge bg-secondary">{produto.categoria}</span>
                    <p className="mt-2 fw-bold">R$ {parseFloat(produto.preco).toFixed(2)}</p>
                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditarProduto(produto)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleExcluirProduto(produto.id)}
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {produtosFiltrados.length === 0 && (
              <p className="text-muted">Nenhum produto encontrado nesta categoria.</p>
            )}
          </div>
        </div>
      );
    }

    return <p className="text-muted mt-3">Escolha uma ação acima.</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5" style={{ color: '#a20566' }}>
        Painel Administrativo da Tia
      </h2>

      <div className="row justify-content-center g-4">
        <div
          className="col-md-6 col-lg-4"
          onClick={() => {
            limparFormulario();
            setSecao('cadastrar');
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="card h-100 text-center shadow card-opcao">
            <div className="card-body">
              <h5 className="card-title">📥 Cadastrar Produto</h5>
              <p className="card-text">Adicione novas delícias ao cardápio</p>
            </div>
          </div>
        </div>

        <div
          className="col-md-6 col-lg-4"
          onClick={() => setSecao('ver')}
          style={{ cursor: 'pointer' }}
        >
          <div className="card h-100 text-center shadow card-opcao">
            <div className="card-body">
              <h5 className="card-title">📋 Ver Produtos</h5>
              <p className="card-text">Visualize os produtos cadastrados</p>
            </div>
          </div>
        </div>
      </div>

      {renderConteudo()}
    </div>
  );
}
