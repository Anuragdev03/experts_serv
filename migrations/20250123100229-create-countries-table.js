'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const isCountriesTableExists = await queryInterface.tableExists("countries");
    if(isCountriesTableExists) {
      return
    }

    await queryInterface.createTable("countries", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(2),
        allowNull:false
      },
      phone_code: {
        type: Sequelize.STRING(4),
        allowNull:false
      },
      region: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('countries');
  }
};
