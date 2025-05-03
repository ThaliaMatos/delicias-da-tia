// src/controllers/produtoController.ts
import { Request, Response } from 'express';

// Simulação de produtos (seria no banco de dados no futuro)
let produtos = [
  { id: 1, nome: 'Bolo de Cenoura', descricao: 'Bolo de cenoura com cobertura de chocolate', preco: 20.00, imagem_url: '' },
];

// Função para listar produtos
export const listarProdutos = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(produtos);
};

// Função para criar produto
export const criarProduto = async (req: Request, res: Response): Promise<void> => {
  const { nome, descricao, preco, imagem_url } = req.body;

  // Verificação de campos obrigatórios
  if (!nome || !descricao || !preco || !imagem_url) {
    res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
  }

  // Simulando a criação do produto (adicionando à lista)
  const novoProduto = {
    id: produtos.length + 1, // Incrementando o ID de forma simples
    nome,
    descricao,
    preco,
    imagem_url,
  };

  produtos.push(novoProduto); // Adicionando produto à lista simulada

    res.status(201).json({
    mensagem: 'Produto criado com sucesso',
    produto: novoProduto,
  });
};
