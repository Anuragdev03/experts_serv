'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'mobile_number', {
      type: Sequelize.STRING(12), 
      allowNull: false,                
      unique: true       
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'mobile_number', {
      type: Sequelize.STRING(12), 
      allowNull: false,                
      unique: true       
    });
  }
};
