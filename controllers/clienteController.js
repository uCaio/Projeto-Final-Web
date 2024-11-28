const { Cliente } = require('../models/db').models;


// Renderizar a página de cadastro
const exibirCadastroCliente = (req, res) => {
  res.render('cadastro');
};

// Cadastrar um cliente
const cadastrarCliente = async (req, res) => {
  try {
    const { nome, cpf, telefone, email, senha } = req.body;
    const clienteExistente = await Cliente.findOne({ where: { cpf } });

    if (clienteExistente) {
      return res.send('<h2>Cliente já existe!</h2>');
    }

    await Cliente.create({ nome, cpf, telefone, email, senha });
    res.send('<h2>Cliente cadastrado com sucesso!</h2>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro no servidor!</h2>');
  }
};

module.exports = { exibirCadastroCliente, cadastrarCliente};
