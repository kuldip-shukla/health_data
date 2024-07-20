const fs = require("fs");
const path = require("path");
const db = require("../models");

const processHeartRateData = async (data) => {
     try {
          const aggregatedData = aggregateHeartRateData(
               data.clinical_data.HEART_RATE.data
          );

          const databaseAttributes = {
               heartRateData: aggregatedData,
               weightData: data.clinical_data.WEIGHT,
               bloodGlucoseData: data.clinical_data.BLOOD_GLUCOSE_LEVELS,
               heightData: data.clinical_data.HEIGHT,
               bloodPressureData: data.clinical_data.BP,
               stepsData: data.clinical_data.STEPS,
               patientId: data.patient_id,
               fromHealthKitSync: data.from_healthkit_sync,
               orgId: data.orgId,
               timestamp: data.timestamp,
          };
          await saveAggregatedDataToPostgres(databaseAttributes);

          return aggregatedData;
     } catch (err) {
          throw new Error("Failed to process heart rate data");
     }
};

const aggregateHeartRateData = (data) => {
     // Logic to aggregate min and max heart rate for every 15 minutes
     const aggregated = [];
     const intervals = groupDataBy15Minutes(data);
     for (const interval of intervals) {
          const minMax = calculateMinMax(interval);
          aggregated.push({
               from_date: interval[0].on_date,
               to_date: interval[interval.length - 1].on_date,
               measurement: {
                    low: minMax.min,
                    high: minMax.max,
               },
          });
     }

     return aggregated;
};

const groupDataBy15Minutes = (data) => {
     const grouped = [];
     let currentInterval = [];
     let currentIntervalStart = new Date(data[0].on_date);

     for (const item of data) {
          const itemDate = new Date(item.on_date);

          if (itemDate - currentIntervalStart < 15 * 60 * 1000) {
               currentInterval.push(item);
          } else {
               grouped.push(currentInterval);
               currentInterval = [item];
               currentIntervalStart = itemDate;
          }
     }

     if (currentInterval.length > 0) {
          grouped.push(currentInterval);
     }

     return grouped;
};

const calculateMinMax = (data) => {
     let min = Infinity;
     let max = -Infinity;

     for (const item of data) {
          const measurement = parseInt(item.measurement);
          if (measurement < min) {
               min = measurement;
          }
          if (measurement > max) {
               max = measurement;
          }
     }

     return { min, max };
};

const saveAggregatedDataToPostgres = async (databaseAttributes) => {
     try {
          const heartData = await db.HealthData.create(databaseAttributes);
          return heartData;
     } catch (err) {
          console.log(err);
          throw err;
     }
};

const readHeartRateDataFromFile = (filePath) => {
     try {
          console.log({ filePath });
          const rawData = fs.readFileSync(filePath);
          console.log("rawData", rawData);
          const data = JSON.parse(rawData);
          return data;
     } catch (err) {
          throw new Error("Failed to read clinical metrics data");
     }
};

const processHeartRateDataFromFile = async (fileData) => {
     try {
          const data = readHeartRateDataFromFile(fileData);
          console.log({ data });
          const aggregatedData = aggregateHeartRateData(
               data.clinical_data.HEART_RATE.data
          );
          console.log({ aggregatedData });

          const databaseAttributes = {
               heartRateData: aggregatedData,
               weightData: data.clinical_data.WEIGHT,
               bloodGlucoseData: data.clinical_data.BLOOD_GLUCOSE_LEVELS,
               heightData: data.clinical_data.HEIGHT,
               bloodPressureData: data.clinical_data.BP,
               stepsData: data.clinical_data.STEPS,
               patientId: data.patient_id,
               fromHealthKitSync: data.from_healthkit_sync,
               orgId: data.orgId,
               timestamp: data.timestamp,
          };

          await saveAggregatedDataToPostgres(databaseAttributes);

          return aggregatedData;
     } catch (err) {
          throw new Error("Failed to process heart rate data");
     }
};

module.exports = {
     processHeartRateData,
     processHeartRateDataFromFile,
};
