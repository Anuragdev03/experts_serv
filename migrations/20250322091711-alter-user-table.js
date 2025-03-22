'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableDesc = await queryInterface.describeTable("users");
    
    if(!tableDesc.show_profile) {
      return queryInterface.addColumn("users", "show_profile", {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      })
    }
  },

  async down (queryInterface, Sequelize) {
    const tableDesc = await queryInterface.describeTable("users");

    if(tableDesc.show_profile) {
      return queryInterface.removeColumn("users", "show_profile");
    }
  }
};
