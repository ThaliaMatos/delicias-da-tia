import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categoria() {
    const { categoria } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantidades, setQuantidades] = useState({});

    const nomesBonitos = {
        bolos: 'Bolos',
        amanteigados: 'Amanteigados',
        boloslowcarb: 'Bolos Low Carb',
        docesespeciais: 'Doces Especiais',
        salgados: 'Salgados',
    };

    useEffect(() => {
        axios
            .get('/produto.json')
            .then(res => {
                const filtrados = res.data.filter(p => p.categoria === nomesBonitos[categoria] || p.categoria.toLowerCase() === categoria);
                setProdutos(filtrados);
            })
            .catch(err => console.error('Erro ao carregar produtos:', err))
            .finally(() => setLoading(false));
    }, [categoria]);

    const alterarQuantidade = (id, novaQtd) => {
        setQuantidades(prev => ({
            ...prev,
            [id]: novaQtd > 0 ? novaQtd : 1
        }));
    };

    const adicionarAoCarrinho = (produto) => {
        const quantidade = quantidades[produto.id] || 1;
        const novoItem = { ...produto, quantidade };
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        const existente = carrinhoAtual.find(p => p.id === produto.id);

        if (existente) existente.quantidade += quantidade;
        else carrinhoAtual.push(novoItem);

        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
        alert('Produto adicionado ao carrinho!');
    };

    if (loading) return <div className="container mt-4">Carregando produtos...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{nomesBonitos[categoria] || categoria}</h2>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}

                {produtos.map((produto) => (
                    <div className="col" key={produto.id}>
                        <div className="card h-100 shadow-sm">
                            <img src={produto.imagem} className="card-img-top" alt={produto.nome} style={{ objectFit: 'cover', height: '200px' }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{produto.nome}</h5>
                                <p className="card-text flex-grow-1">{produto.descricao}</p>
                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                    <p className="preco-produto mb-2 me-auto fw-bold">R$ {produto.preco.toFixed(2)}</p>

                                    <div className="controle-quantidade d-flex align-items-center">
                                        <button onClick={() =>
                                            alterarQuantidade(produto.id, (quantidades[produto.id] || 1) - 1)
                                        }>
                                            −
                                        </button>

                                        <span>{quantidades[produto.id] || 1}</span>

                                        <button onClick={() =>
                                            alterarQuantidade(produto.id, (quantidades[produto.id] || 1) + 1)
                                        }>
                                            +
                                        </button>
                                    </div>
                                </div>


                                <button
                                    className="botao-carrinho mx-auto mt-auto"
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
    );
}
