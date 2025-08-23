import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const uploadFolder = path.resolve('uploads');

export const listarProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

export const listarDestaques = async (req: Request, res: Response) => {
  try {
    const destaques = await prisma.produto.findMany({
      where: { destaque: true },
    });
    res.json(destaques);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar destaques' });
  }
};

export const criarProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco, categoria, destaque } = req.body;
    const img = req.file?.filename || '';

    // Valida limite de 3 destaques
    if (destaque === 'true') {
      const countDestaques = await prisma.produto.count({
        where: { destaque: true },
      });
      if (countDestaques >= 3) {
        return res.status(400).json({ error: 'Já existem 3 produtos em destaque' });
      }
    }

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: parseFloat(preco),
        categoria,
        imagem: img,
        destaque: destaque === 'true',
      },
    });

    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const editarProduto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, descricao, preco, categoria, destaque } = req.body;
    const novaImagem = req.file?.filename;

    const produtoAtual = await prisma.produto.findUnique({ where: { id } });
    if (!produtoAtual) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Valida limite de 3 destaques
    if (destaque === 'true' && !produtoAtual.destaque) {
      const countDestaques = await prisma.produto.count({
        where: { destaque: true },
      });
      if (countDestaques >= 3) {
        return res.status(400).json({ error: 'Já existem 3 produtos em destaque' });
      }
    }

    if (novaImagem && produtoAtual.imagem) {
      const caminhoImagemAntiga = path.join(uploadFolder, produtoAtual.imagem);
      if (fs.existsSync(caminhoImagemAntiga)) {
        fs.unlinkSync(caminhoImagemAntiga);
      }
    }

    const dataUpdate: any = {
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      destaque: destaque === 'true',
    };
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

    const produto = await prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (produto.imagem) {
      const caminhoImagem = path.join(uploadFolder, produto.imagem);
      if (fs.existsSync(caminhoImagem)) {
        fs.unlinkSync(caminhoImagem);
      }
    }

    await prisma.produto.delete({ where: { id } });

    res.json({ message: 'Produto apagado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao apagar produto' });
  }
};


export const listarProdutosDestaques = async (req: Request, res: Response) => {
  try {
    const destaques = await prisma.produto.findMany({
      where: { destaque: true },
    });
    res.json(destaques);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos em destaque' });
  }
};

export const alternarDestaqueProduto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const produto = await prisma.produto.findUnique({ where: { id } });
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    // Se o produto não está destacado e já há 3 destaques, bloqueia
    if (!produto.destaque) {
      const countDestaques = await prisma.produto.count({ where: { destaque: true } });
      if (countDestaques >= 3) {
        return res.status(400).json({ error: 'Já existem 3 produtos em destaque' });
      }
    }

    // Alterna o destaque
    const produtoAtualizado = await prisma.produto.update({
      where: { id },
      data: { destaque: !produto.destaque },
    });

    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alternar destaque' });
  }
};

