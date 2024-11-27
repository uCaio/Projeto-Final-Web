const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Pedido extends Model {
    static associate(models) {
      // Um pedido pertence a um cliente
      Pedido.belongsTo(models.Cliente, { foreignKey: 'clienteID' });

      // Um pedido pertence a um livro
      Pedido.belongsTo(models.Livro, { foreignKey: 'livroID' });
    }
  }

  Pedido.init({
    pedidoID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    clienteID: DataTypes.INTEGER,
    livroID: DataTypes.INTEGER,
    dataPedido: DataTypes.DATE,
    quantidade: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL(10, 2),
  }, {
    sequelize,
    modelName: 'Pedido',
  });

  return Pedido;
};
