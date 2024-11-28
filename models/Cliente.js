const { Model, DataTypes } = require('sequelize');

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
      senha: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'clientes',
      timestamps: false,
    }
  );

  return Cliente;
};


