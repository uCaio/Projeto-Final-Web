const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // Importando bcryptjs
const sequelize = new Sequelize('database_development', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const Cliente = sequelize.define('Cliente', {
  nome: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
});

// Hook para criptografar a senha antes de salvar no banco de dados
Cliente.beforeCreate(async (cliente) => {
  if (cliente.senha) {
    cliente.senha = await bcrypt.hash(cliente.senha, 10);
  }
});

Cliente.beforeUpdate(async (cliente) => {
  if (cliente.senha) {
    cliente.senha = await bcrypt.hash(cliente.senha, 10);
  }
});

// Função para verificar a senha no login
Cliente.prototype.verificarSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha); // Comparando a senha fornecida com a senha armazenada
};

module.exports = { Cliente, sequelize };