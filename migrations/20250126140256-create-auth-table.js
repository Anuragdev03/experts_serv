'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const isAuthTableExist = await queryInterface.tableExists("auth");
    if(isAuthTableExist) {
      return
    }

    await queryInterface.createTable("auth", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("auth")
  }
};
