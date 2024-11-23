const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/Cliente.js');
const clienteController = require('./controllers/clienteController');
const livroController = require('./controllers/livroController');

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
app.use('/', clienteController);

app.use('/cadastroLivro', livroController);

app.get('/home', (req, res) => {
  res.render('home')
} )
