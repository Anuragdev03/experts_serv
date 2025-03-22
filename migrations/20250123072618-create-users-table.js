'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const isUserTableExists = await queryInterface.tableExists("users");
    if (isUserTableExists) {
      return
    }

    await queryInterface.createTable("users", {
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
      user_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      state: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      pincode: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      lat: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      lng: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      job_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
      },
      mobile_number: {
        type: Sequelize.STRING(12),
        allowNull: false,
        unique: true 
      },
      whatsapp_number: {
        type: Sequelize.STRING(12),
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM("admin", "expert", "guest"),
        allowNull: false,
        defaultValue: "expert"
      },
      show_profile: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
    await queryInterface.dropTable('Users');
  }
};
