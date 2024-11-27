const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Cliente extends Model {
    static associate(models) {
      // Um cliente pode ter muitos pedidos
      Cliente.hasMany(models.Pedido, { foreignKey: 'clienteID' });
    }
  }

  Cliente.init({
    clienteID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cliente',
  });

  return Cliente;
};
