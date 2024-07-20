require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./src/routes");
const { PORT } = require("./src/config");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
