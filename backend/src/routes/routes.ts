import { Router } from 'express';
import { listarProdutos, criarProduto} from '../controllers/produtosController';
import { verificarToken } from '../middlewares/authMiddleware';
import authRoutes from './authRoutes';

const router = Router();

router.use(authRoutes);
router.get('/produtos', listarProdutos);  // Rota para listar produtos
router.post('/produtos', verificarToken, criarProduto);  // Rota protegida para criar produto

export default router;
