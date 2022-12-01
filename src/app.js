const express = require('express');
const cors = require('cors');
const { getTimer, iniciar, passwdValidade } = require('./controller');
const app = express();
const port = 3000;

app.use(cors());
app.use('', function (req, res, next) {
  // Valida se a requisição veio do front
  next();
});
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Benvindo ao Hackaton');
});

app.get('/timer', (req, res) => {
  console.log('TIMER');
  res.json(getTimer());
});

app.post('/init', (req, res) => {
  res.json(iniciar());
});

app.post('/passwd', (req, res) => {
  res.json(passwdValidade(req.body));
});

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`);
});
