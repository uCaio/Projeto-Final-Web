const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Cliente, { foreignKey: 'clienteID' });
      Pedido.belongsTo(models.Livro, { foreignKey: 'livroID' });
    }
  }

  Pedido.init(
    {
      pedidoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      clienteID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'clienteID',
        },
      },
      livroID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'livros',
          key: 'livroID',
        },
      },
      dataPedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Pedido',
      tableName: 'pedidos',
      timestamps: false,
    }
  );

  return Pedido;
};
