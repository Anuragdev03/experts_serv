'use strict';

const csv = require("csv-parser")
const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const records = [];
            const csvPath = path.join(__dirname, '../rawdata', 'service_jobs.csv');
            
            const readCsv = () => {
              return new Promise((resolve, reject) => {
                fs.createReadStream(csvPath)
                  .pipe(csv())
                  .on('data', (row) => records.push(row))
                  .on('end', () => {
                    resolve()
                  })
                  .on('error', (error) => reject(error));
              });
            }
        
            try {
              await readCsv();
        
              await queryInterface.bulkInsert("jobs", records, {})
            } catch (err) {
              console.log(err)
            }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('jobs', null, {});
  }
};
