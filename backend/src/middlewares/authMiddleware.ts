import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];  // Espera o token no header 'Authorization'

  if (!token) {
    res.status(401).json({ mensagem: 'Token ausente' });
    return; // ← necessário para evitar execução posterior
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo');
    (req as any).usuario = decoded;
    next(); // segue para a próxima middleware/rota
  } catch {
    res.status(403).json({ mensagem: 'Token inválido' });
    return; // ← também necessário aqui
  }
};
