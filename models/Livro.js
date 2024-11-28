const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Livro extends Model {
    static associate(models) {
      Livro.hasMany(models.Pedido, { foreignKey: 'livroID' });
    }
  }

  Livro.init(
    {
      livroID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: { type: DataTypes.STRING, allowNull: false },
      autor: { type: DataTypes.STRING, allowNull: false },
      genero: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Livro',
      tableName: 'livros',
      timestamps: false,
    }
  );

  return Livro;
};
