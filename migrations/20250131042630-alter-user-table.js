'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'city', {
      type: Sequelize.STRING(100),
      allowNull: true,                
    });
    await queryInterface.changeColumn('users', 'state', {
      type: Sequelize.STRING(100),
      allowNull: true,                
    });
    await queryInterface.changeColumn('users', 'country', {
      type: Sequelize.STRING(100),
      allowNull: true,                
    });
    await queryInterface.changeColumn('users', 'pincode', {
      type: Sequelize.STRING(10),
      allowNull: true,                
    });
    await queryInterface.changeColumn('users', 'lat', {
      type: Sequelize.STRING(50),
      allowNull: true,                
    });
    await queryInterface.changeColumn('users', 'lng', {
      type: Sequelize.STRING(50),
      allowNull: true,                
    });
    await queryInterface.changeColumn('users', 'job_ids', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,                
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
