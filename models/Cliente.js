const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs'); // Importando bcryptjs

module.exports = (sequelize) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.hasMany(models.Pedido, { foreignKey: 'clienteID' });
    }
  }

  Cliente.init(
    {
      clienteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: { type: DataTypes.STRING, allowNull: false },
      cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
      telefone: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      senha: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'clientes',
      timestamps: false,
      hooks: {
        // Antes de criar um cliente, criptografa a senha
        beforeCreate: async (cliente) => {
          if (cliente.senha) {
            cliente.senha = await bcrypt.hash(cliente.senha, 10);
          }
        },
        // Antes de atualizar um cliente, criptografa a senha se ela for modificada
        beforeUpdate: async (cliente) => {
          if (cliente.senha) {
            cliente.senha = await bcrypt.hash(cliente.senha, 10);
          }
        },
      },
    }
  );

  return Cliente;
};