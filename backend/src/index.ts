import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes';  // Importando as rotas

dotenv.config();  // Carrega as variáveis de ambiente

const app = express();
app.use(express.json());  // Permite trabalhar com JSON
app.use(routes);  // Usando as rotas

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
