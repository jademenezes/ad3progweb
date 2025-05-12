const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'PUT', 'POST', 'OPTIOSN'] }));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/professores', (req, res) => {
  const professores = require('./public/professores.json');

  res.json({ professores });
});

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
