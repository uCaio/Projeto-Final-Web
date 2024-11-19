const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_development', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql', // Pode ser 'postgres', 'sqlite', etc.
  logging: false,  // Desativa logs no console
});

const Cliente = sequelize.define('Clientes', {
  clienteID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  nome: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  senha: { type: DataTypes.STRING }
}, {
  tableName: 'clientes',  // Usando o nome exato da tabela
  timestamps: false     // Desabilita o uso de 'createdAt' e 'updatedAt'
});

module.exports = { Cliente, sequelize };
