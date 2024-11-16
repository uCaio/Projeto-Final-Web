const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Cliente, sequelize } = require('./models/Clientes.js');

const app = express();
const port = 80;

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida!');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  res.render('cadastro');
});

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro ao buscar os clientes</h2>');
  }
});

app.post('/cadastro', async (req, res) => {
  try {
    const { nome, cpf, telefone, email, senha } = req.body;

    const clienteExistente = await Cliente.findOne({ where: { cpf } });
    if (clienteExistente) {
      return res.send('<h2>Usuário já existe</h2>');
    }

    await Cliente.create({ nome, cpf, telefone, email, senha });
    res.send('<h2>Usuário inserido com sucesso!</h2>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<h2>Erro no servidor</h2>');
  }
});
