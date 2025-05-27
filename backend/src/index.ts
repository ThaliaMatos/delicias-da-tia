import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Delícias da Tia está online!');
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
