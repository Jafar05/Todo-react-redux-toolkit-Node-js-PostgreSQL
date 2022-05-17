module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'admin',
      email: 'admin@mail.rus',
      password: '$2a$12$HvtXy7iDtuU/kYgGv7ePD.OeTgMRJgTApL.omR8eKMqVI54ZuL/yu',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
