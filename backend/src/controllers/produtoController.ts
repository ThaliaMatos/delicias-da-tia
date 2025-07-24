import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const uploadFolder = path.resolve('uploads');
// const uploadFolder = path.join(__dirname, '..', 'uploads');

export const listarProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

export const criarProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco, categoria } = req.body;
    const img = req.file?.filename || '';

    const produto = await prisma.produto.create({
      data: { nome, descricao, preco: parseFloat(preco), categoria, imagem: img },
    });

    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const editarProduto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, descricao, preco, categoria } = req.body;
    const novaImagem = req.file?.filename;

    // Busca o produto atual para pegar a imagem antiga
    const produtoAtual = await prisma.produto.findUnique({ where: { id } });
    if (!produtoAtual) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Se veio uma nova imagem e existe imagem antiga, apaga o arquivo antigo
    if (novaImagem && produtoAtual.imagem) {
      const caminhoImagemAntiga = path.join(uploadFolder, produtoAtual.imagem);
      if (fs.existsSync(caminhoImagemAntiga)) {
        fs.unlinkSync(caminhoImagemAntiga);
      }
    }

    // Monta o objeto de atualização
    const dataUpdate: any = { nome, descricao, preco: parseFloat(preco), categoria };
    if (novaImagem) dataUpdate.imagem = novaImagem;

    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: dataUpdate,
    });

    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar produto' });
  }
};

export const apagarProduto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    // Busca o produto para pegar a imagem
    const produto = await prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Apaga a imagem do produto, se existir
    if (produto.imagem) {
      const caminhoImagem = path.join(uploadFolder, produto.imagem);
      if (fs.existsSync(caminhoImagem)) {
        fs.unlinkSync(caminhoImagem);
      }
    }

    // Apaga o produto do banco
    await prisma.produto.delete({ where: { id } });

    res.json({ message: 'Produto apagado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao apagar produto' });
  }
};
