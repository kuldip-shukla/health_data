module.exports = {
     host: process.env.DB_HOST || "localhost",
     port: process.env.DB_PORT || 5432,
     username: process.env.DB_USER || "postgres",
     password: process.env.DB_PWD || "root",
     database: process.env.DB_NAME || "care_monitor",
     dialect: "postgres",
};
