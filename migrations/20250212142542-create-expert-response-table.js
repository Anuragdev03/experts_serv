'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const isTableExist = await queryInterface.tableExists("expert_response");
    if(isTableExist) {
      return
    }

    await queryInterface.createTable("expert_response", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tracking_link: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      available_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      response_message: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("pending", "accepted", "declined"),
        allowNull: true,
        defaultValue: "pending"
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
    await queryInterface.dropTable("expert_response")
  }
};
