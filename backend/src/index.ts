import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Rota: /api/login
app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
