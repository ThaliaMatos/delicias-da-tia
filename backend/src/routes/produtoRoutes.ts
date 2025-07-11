import { Router } from 'express';
import {
  listarProdutos,
  criarProduto,
  editarProduto,
  apagarProduto,
} from '../controllers/produtoController';
import upload from '../middlewares/uploadMiddleware';
import { autenticar } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', listarProdutos); // público

router.post('/', autenticar, upload.single('img'), criarProduto); // admin

router.put('/:id', autenticar, upload.single('img'), editarProduto); // admin

router.delete('/:id', autenticar, apagarProduto); // admin

export default router;
