'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: "Anurag D",
        user_name: "anurag",
        email: "anuragdev03@hotmail.com",
        password: "Anurag007",
        address: "4/10 D5A",
        city: "Gudalur",
        state: "Tamil Nadu",
        country: "India",
        pincode: "643211",
        lat: "0",
        lng: "0",
        job_ids: [1,2],
        mobile_number: "8489345565",
        whatsapp_number: "8489345565",
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
