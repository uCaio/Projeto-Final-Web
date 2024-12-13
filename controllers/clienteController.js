const { Cliente } = require('../models/db').models;
const bcrypt = require('bcryptjs'); // Importando o bcryptjs

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

    // Criptografando a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await Cliente.create({ nome, cpf, telefone, email, senha: senhaCriptografada });
    res.redirect('/clientes/listaClientes');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro no servidor!</h2>');
  }
};

const editarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email, senha } = req.body;

    const cliente = await Cliente.findByPk(id); // Busca o cliente pelo ID
    if (!cliente) {
      return res.status(404).send('<h2>Cliente não encontrado.</h2>');
    }

    // Se a senha for fornecida, criptografa antes de atualizar
    let senhaCriptografada = senha;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    // Atualiza os dados do cliente
    await Cliente.update(
      { nome, telefone, email, senha: senhaCriptografada },
      { where: { clienteID: id } }
    );
    res.redirect('/clientes/listaClientes'); // Redireciona para a lista de clientes
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro ao editar cliente.</h2>');
  }
};

const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.render('listaClientes', { clientes });
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro ao carregar lista de clientes.</h2>');
  }
};

const deletarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).send('<h2>Cliente não encontrado.</h2>');
    }
    await Cliente.destroy({ where: { clienteID: id } });
    res.redirect('/clientes/listaClientes');
  } catch (error) {
    console.log(error);
    res.status(500).send('<h2>Erro ao deletar cliente.</h2>');
  }
};

module.exports = { exibirCadastroCliente, cadastrarCliente, editarCliente, listarClientes, deletarCliente };