'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      pedidoID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      clienteID: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: 'clientes',
          key: 'clienteID'
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      livro: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: 'livros',
          key: 'livroID',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      preço: {
        type: Sequelize.DECIMAL,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos')
  }
};
