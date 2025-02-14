'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableDesc = await queryInterface.describeTable("customer_request");

    if(!tableDesc.status) {
      return queryInterface.addColumn("customer_request", "status", {
        type: Sequelize.ENUM("pending", "accepted", "declined"),
        allowNull: true,
        defaultValue: "pending"
      })
    }
  },

  async down (queryInterface, Sequelize) {
    const tableDesc = await queryInterface.describeTable("customer_request");

    if (tableDesc.status) {  // Check if column exists before removing
      return queryInterface.removeColumn("customer_request", "status");
    }
  }
};
