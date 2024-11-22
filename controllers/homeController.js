// const { Cliente } = require('../models/Cliente.js');
const { Router } = require('express');
const roteador = Router();

// Rotas
roteador.get('/', (req, res) => {
  res.render('home');
});

module.exports = roteador;