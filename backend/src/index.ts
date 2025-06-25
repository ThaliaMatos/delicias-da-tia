import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);    // rotas públicas (login, registro)
app.use('/api/admin', adminRoutes);  // rotas protegidas pelo middleware

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
