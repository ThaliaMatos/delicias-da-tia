import { Router } from 'express';
import { autenticar } from '../middlewares/authMiddleware';

const router = Router();

router.get('/dashboard', autenticar, (req, res) => {
  res.json({ message: 'Painel da tia carregado com sucesso!' });
});

export default router;
