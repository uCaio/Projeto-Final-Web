const { Sequelize } = require('sequelize');

// Criação da instância do Sequelize
const sequelize = new Sequelize('database_development', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// Inicialização dos modelos
const Cliente = require('./Cliente')(sequelize);
const Livro = require('./Livro')(sequelize);
const Pedido = require('./Pedido')(sequelize);

const models = {
  Cliente,
  Livro,
  Pedido,
};

// Registro das associações
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, models };
