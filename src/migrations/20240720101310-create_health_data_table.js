"use strict";

module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable("health_data", {
               id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
               },
               heartRateData: {
                    type: Sequelize.JSONB,
               },
               weightData: {
                    type: Sequelize.JSONB,
               },
               bloodGlucoseData: {
                    type: Sequelize.JSONB,
               },
               heightData: {
                    type: Sequelize.JSONB,
               },
               bloodPressureData: {
                    type: Sequelize.JSONB,
               },
               stepsData: {
                    type: Sequelize.JSONB,
               },
               patientId: {
                    type: Sequelize.STRING,
               },
               fromHealthKitSync: {
                    type: Sequelize.BOOLEAN,
               },
               orgId: {
                    type: Sequelize.STRING,
               },
               timestamp: {
                    type: Sequelize.DATE,
               },
               createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
               },
               updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
               },
          });
     },
     down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable("health_data");
     },
};
