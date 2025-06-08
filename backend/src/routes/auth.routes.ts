import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (email === 'tia@d.com' && senha === '123456') {
    // Envia token junto com a mensagem
    return res.status(200).json({ 
      mensagem: 'Logado', 
      token: 'token_fake_123' // Aqui você pode gerar um JWT se quiser
    });
  } else {
    return res.status(401).json({ mensagem: 'Erro de login' });
  }
});

export default router;
