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

const editarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email, senha } = req.body;

    const cliente = await Cliente.findByPk(id); // Busca o cliente pelo ID
    if (!cliente) {
      return res.status(404).send('<h2>Cliente não encontrado.</h2>');
    }

    // Atualiza os dados do cliente
    await Cliente.update(
      { nome, telefone, email, senha },
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
    const clientes = await Cliente.findAll(); // Busca todos os clientes
    res.render('listaClientes', { clientes }); // Envia para a página EJS
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro ao carregar lista de clientes.</h2>');
  }
};


module.exports = { exibirCadastroCliente, cadastrarCliente, editarCliente, listarClientes};
