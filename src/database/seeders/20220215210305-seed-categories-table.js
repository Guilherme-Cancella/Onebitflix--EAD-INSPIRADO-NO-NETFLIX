'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Cursos Completos', position: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Tecnologias Back-end', position: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Tecnologias Front-end', position: 3, created_at: new Date(), updated_at: new Date() },
      { name: 'Ferramentas de Desenvolvimento', position: 4, created_at: new Date(), updated_at: new Date() },
      { name: 'Produtividade', position: 5, created_at: new Date(), updated_at: new Date() },
      { name: 'Soft-skills', position: 6, created_at: new Date(), updated_at: new Date() },
      { name: 'Expandindo Conhecimentos', position: 7, created_at: new Date(), updated_at: new Date() },
      { name: 'Carreira', position: 8, created_at: new Date(), updated_at: new Date() },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  }
};
