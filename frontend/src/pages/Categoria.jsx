import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Categoria() {
    const { categoria } = useParams();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantidades, setQuantidades] = useState({});


    // Mapeamento para nomes "bonitos" das categorias
    const nomesBonitos = {
        bolos: 'Bolos',
        amanteigados: 'Amanteigados',
        boloslowcarb: 'Bolos Low Carb',
        docesespeciais: 'Doces Especiais',
        salgados: 'Salgados',
    };

    useEffect(() => {
        fetch('/public/produto.json')
            .then(res => res.json())
            .then(data => {
                const filtrados = data.filter(p => p.categoria === categoria);
                setProdutos(filtrados);
                setLoading(false);
            })
            .catch(err => {
                console.error('Erro ao carregar produtos:', err);
                setLoading(false);
            });
    }, [categoria]);

    const alterarQuantidade = (id, novaQtd) => {
        setQuantidades(prev => ({
            ...prev,
            [id]: novaQtd > 0 ? novaQtd : 1
        }));
    };




    if (loading) {
        return <div className="container mt-4">Carregando produtos...</div>;
    }

    const adicionarAoCarrinho = (produto) => {
        const quantidade = quantidades[produto.id] || 1;

        const novoItem = {
            ...produto,
            quantidade
        };

        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];

        const existente = carrinhoAtual.find(p => p.id === produto.id);

        if (existente) {
            existente.quantidade += quantidade;
        } else {
            carrinhoAtual.push(novoItem);
        }

        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
        alert('Produto adicionado ao carrinho!');
    };




    return (
        <div className="container mt-4">
            <h2>{nomesBonitos[categoria] || categoria}</h2>
            <div className="row">
                {produtos.length === 0 && <p>Nenhum produto encontrado para essa categoria.</p>}

                {produtos.map((produto) => (
                    <div className="col-md-4" key={produto.id}>
                        <div className="card mb-4">
                            <img src={produto.imagem} className="card-img-top" alt={produto.nome} />
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <p className="card-text">{produto.descricao}</p>
                                <p className="card-text fw-bold">R$ {produto.preco.toFixed(2)}</p>

                                <div className="controle-quantidade">
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

                                <button
                                    className="botao-carrinho"
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
