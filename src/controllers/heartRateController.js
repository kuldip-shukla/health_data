const path = require("path");
const heartRateService = require("../services/heartRateService");

async function processData(req, res, next) {
     try {
          const { mode } = req.query;

          let processedData;
          if (mode === "file") {
               const file = req.file;
               console.log({ file });
               if (!file) {
                    return res
                         .status(400)
                         .json({ error: "File upload required" });
               }
               const filePath = path.join(
                    __dirname,
                    "../../",
                    "uploads",
                    file.filename
               );

               processedData =
                    await heartRateService.processHeartRateDataFromFile(
                         filePath
                    );
          } else {
               const { clinical_data } = req.body;
               if (
                    !clinical_data ||
                    !clinical_data.HEART_RATE ||
                    !clinical_data.HEART_RATE.data
               ) {
                    throw new Error("Invalid payload format");
               }

               const heartRateData = req.body;
               processedData = await heartRateService.processHeartRateData(
                    heartRateData
               );
          }

          res.json(processedData);
     } catch (err) {
          next(err);
     }
}

module.exports = {
     processData,
};
