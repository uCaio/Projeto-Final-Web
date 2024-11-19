const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_development', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Livro = sequelize.define('Livros', {
  livroID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'livros',  // Usando o nome exato da tabela
  timestamps: false     // Desabilita o uso de 'createdAt' e 'updatedAt'
});

module.exports = { Livro, sequelize };
