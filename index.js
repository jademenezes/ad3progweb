const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST', 'OPTIOSN'] }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/sobre', (req, res) => {
  res.send('Esta será a página sobre');
});

app.get('/professores', (req, res) => {
  // carrega o arquivo professores.json
  const professores = require('./public/professores.json');

  // Envia o arquivo JSON como resposta
  res.json({ professores });
});

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
