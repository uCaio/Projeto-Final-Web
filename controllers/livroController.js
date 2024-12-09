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
    res.redirect('/livros/listaLivros');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro no servidor!</h2>');
  }
};

const editarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeLivro, autor, genero } = req.body;

    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).send('<h2>Livro não encontrado.</h2>')
    }
    await Livro.update({ nomeLivro, autor, genero },{ where: { livroID: id } });
    res.redirect('/livros/listaLivros');
  } catch (error) {
    console.log(error);
    res.status(500).send('<h2>Erro ao editar livro.</h2>')
  }
}
const listarLivro = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.render('listaLivros', {livros});
  } catch (error) {
    console.log(error)
    res.status(500).send('Erro ao carregar lista de livros. ')
  }
}

const deletarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findByPk(id);
    if (!livro) {
      return res.status(404).send('<h2>Livro não encontrado.</h2>');
    }
    await Livro.destroy({ where: { livroID: id } });
    res.redirect('/livros/listaLivros');

  } catch (error) {
    console.log(error);
    res.status(500).send('<h2>Erro ao deletar livro.</h2>')
  }
}

module.exports = { exibirCadastroLivro, cadastrarLivro, editarLivro, listarLivro, deletarLivro };
