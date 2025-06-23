const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/sobre', (req, res) => {
  res.send('Esta será a página sobre');
});

app.use('/', require('./routes'));

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
