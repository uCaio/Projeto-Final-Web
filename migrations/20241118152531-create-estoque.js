'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estoque', {
      estoqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      livroID: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: 'livros',
          key: 'livroID',
        },
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
      },
      QntdLivros: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('estoque')
  }
};
