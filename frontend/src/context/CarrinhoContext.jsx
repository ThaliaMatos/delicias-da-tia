import { createContext, useContext, useEffect, useState } from 'react';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(carrinhoSalvo);
  }, []);

  const atualizarCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const adicionarProduto = (produto, quantidade = 1) => {
    const existente = carrinho.find(p => p.id === produto.id);
    let novoCarrinho;

    if (existente) {
      novoCarrinho = carrinho.map(p =>
        p.id === produto.id
          ? { ...p, quantidade: p.quantidade + quantidade }
          : p
      );
    } else {
      novoCarrinho = [...carrinho, { ...produto, quantidade }];
    }

    atualizarCarrinho(novoCarrinho);
  };

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarProduto }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
