'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const isStatessTableExists = await queryInterface.tableExists("states");
    if(isStatessTableExists) {
      return
    }

    await queryInterface.createTable("states", {
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
      country_id: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      country_code: {
        type: Sequelize.STRING(2),
        allowNull:false
      },
      country_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("states")
  }
};
