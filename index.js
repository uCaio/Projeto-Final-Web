const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/db');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport'); // Corrigido
require('./config/passportConfig'); // Apenas configura o Passport
const flash = require('connect-flash'); // Importa o connect-flash
const app = express();
const port = 80;

// Importar as rotas
const clienteRoutes = require('./routes/clienteRoutes');
const livroRoutes = require('./routes/livroRoutes');
const homeRoutes = require('./routes/homeRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const authRoutes = require('./routes/authRoutes');

// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));


// Configuração da sessão
app.use(
  session({
    secret: 'seuSegredoAqui',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// Inicializa o Passport e a sessão
app.use(passport.initialize());
app.use(passport.session());

// Middleware para expor o usuário autenticado nas views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Conectar as rotas
app.use('/', homeRoutes);
app.use('/clientes', clienteRoutes);
app.use('/livros', livroRoutes);
app.use('/pedidos', pedidoRoutes);
app.use(authRoutes);

// Sincroniza o banco de dados e inicia o servidor
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida!');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));
