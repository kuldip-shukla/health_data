const express = require("express");
const router = express.Router();
const multer = require("multer");
const heartRateController = require("../controllers/heartRateController");

const upload = multer({ dest: "uploads/" });

// POST /api/process-data
router.post(
     "/process-data",
     upload.single("file"),
     heartRateController.processData
);

module.exports = router;
