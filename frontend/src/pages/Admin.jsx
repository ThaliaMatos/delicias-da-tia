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
      const token = localStorage.getItem('token');

      axios
        .get('http://localhost:3333/api/produtos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
    setImagemBase64(produto.imagem);
    setCategoria(produto.categoria);
    setPreco(produto.preco);
  }

  async function handleExcluirProduto(id) {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3333/api/produtos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProdutos((produtosAntigos) => produtosAntigos.filter((p) => p.id !== id));
      alert('Produto excluído com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir produto');
    }
  }


  function renderConteudo() {
    if (secao === 'cadastrar') {
      return (
        <div className="card h-100 text-center shadow d-flex flex-column justify-content-center">
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
                name="img"
                className="form-control"
                accept="imagem/*"
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

          <div className="row g-4">
            {produtosFiltrados.map((produto) => (
              <div className="col-md-4" key={produto.id}>
                <div className="card h-100 d-flex flex-column shadow">
                  <img
                    src={produto.imagem ? `http://localhost:3333/uploads/${produto.imagem}` : 'https://via.placeholder.com/300x200'}
                    alt={produto.nome}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text">{produto.descricao}</p>
                    <span className="badge bg-secondary">{produto.categoria}</span>
                    <p className="mt-2 fw-bold">R$ {parseFloat(produto.preco).toFixed(2)}</p>
                    <div className="mt-auto d-flex justify-content-start gap-2">
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
    <div className="container mt-4">
      <h2 className="text-center mb-5" style={{ color: '#a20566' }}>
        Painel Administrativo da Tia
      </h2>

      <div className="row justify-content-center align-items-stretch g-4">
        <div
          className="col-md-6 col-lg-4 mb-4"
          onClick={() => {
            limparFormulario();
            setSecao('cadastrar');
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="card h-100 text-center shadow d-flex flex-column justify-content-center">
            <div className="card-body">
              <h5 className="card-title">📥 Cadastrar Produto</h5>
              <p className="card-text">Adicione novas delícias ao cardápio</p>
            </div>
          </div>
        </div>

        <div
          className="col-md-6 col-lg-4 mb-4"
          onClick={() => setSecao('ver')}
          style={{ cursor: 'pointer' }}
        >
          <div className="card h-100 text-center shadow d-flex flex-column justify-content-center">
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
