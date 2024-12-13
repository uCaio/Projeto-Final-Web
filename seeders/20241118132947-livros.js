'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('livros', [
      {
        nome: 'Sql - Curso Prático',
        autor: 'Celso Henrique Poderoso de Oliveira ',
        genero: 'Educação'
      }
     
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('livros', null, {});
  }
};
