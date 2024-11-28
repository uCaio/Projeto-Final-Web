const { Livro } = require('../models/db').models;

// Renderizar a página de cadastro
const exibirCadastroLivro = (req, res) => {
  res.render('cadastroLivro');
};

// Cadastrar um livro
const cadastrarLivro = async (req, res) => {
  try {
    const { nomeLivro, autor, genero } = req.body;
    const livroExistente = await Livro.findOne({ where: { nome: nomeLivro } });

    if (livroExistente) {
      return res.send('<h2>O livro já existe!</h2>');
    }

    await Livro.create({ nome: nomeLivro, autor, genero });
    res.send('<h2>Livro cadastrado com sucesso!</h2>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro no servidor!</h2>');
  }
};

module.exports = { exibirCadastroLivro, cadastrarLivro };
