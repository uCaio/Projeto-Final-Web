const { Cliente } = require('../models/Cliente.js');
const { Router } = require('express');

const roteador = Router();

// Rotas
roteador.get('/', (req, res) => {
  res.render('cadastro');
});

roteador.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro ao buscar os clientes</h2>');
  }
});

roteador.post('/cadastro', async (req, res) => {
  try {
    const { nome, cpf, telefone, email, senha } = req.body;

    const clienteExistente = await Cliente.findOne({ where: { cpf } });
    if (clienteExistente) {
      return res.send('<h2>Usuário já existe</h2>');
    }

    await Cliente.create({ nome, cpf, telefone, email, senha });
    res.send('<h2>Cadastro concluído com sucesso!!</h2>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro no servidor</h2>');
  }
});

module.exports = roteador;
