import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import produtoRoutes from './routes/produtoRoutes';
import path from 'path';


const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use('/api', authRoutes);    // rotas públicas (login, registro)
app.use('/api/admin', adminRoutes);  // rotas protegidas pelo middleware
app.use('/api/produtos', produtoRoutes);app.use('/api/produtos', produtoRoutes);//rotas produto

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
