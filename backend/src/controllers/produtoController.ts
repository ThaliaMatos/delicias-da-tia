import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    const img = req.file?.filename;

    const dataUpdate: any = { nome, descricao, preco: parseFloat(preco), categoria };
    if (img) dataUpdate.imagem = img;

    const produto = await prisma.produto.update({
      where: { id },
      data: dataUpdate,
    });

    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar produto' });
  }
};

export const apagarProduto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.produto.delete({ where: { id } });
    res.json({ message: 'Produto apagado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao apagar produto' });
  }
};
