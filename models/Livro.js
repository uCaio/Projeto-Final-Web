const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Livro extends Model {
    static associate(models) {
      // Um livro pode estar em muitos pedidos
      Livro.hasMany(models.Pedido, { foreignKey: 'livroID' });
    }
  }

  Livro.init({
    livroID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: DataTypes.STRING,
    autor: DataTypes.STRING,
    genero: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Livro',
  });

  return Livro;
};
