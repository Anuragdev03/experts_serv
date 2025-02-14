'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const isTableExist = await queryInterface.tableExists("notification");
    if(isTableExist) {
      return
    }

    await queryInterface.createTable("notification", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("notification")
  }
};
