import express from 'express';
import cors from 'cors';
import router from './src/routes/index';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('🚀 Servidor rodando com TypeScript!');
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});