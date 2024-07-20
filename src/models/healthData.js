const DataTypes = require("sequelize");

module.exports = (sequelize) => {
     const HealthData = sequelize.define(
          "HealthData",
          {
               heartRateData: DataTypes.JSONB,
               weightData: DataTypes.JSONB,
               bloodGlucoseData: DataTypes.JSONB,
               heightData: DataTypes.JSONB,
               bloodPressureData: DataTypes.JSONB,
               stepsData: DataTypes.JSONB,
               patientId: DataTypes.STRING,
               fromHealthKitSync: DataTypes.BOOLEAN,
               orgId: DataTypes.STRING,
               timestamp: DataTypes.DATE,
          },
          {
               tableName: "health_data",
               timestamps: true,
          }
     );
     return HealthData;
};
