module.exports = {
     PORT: process.env.PORT || 3000,
     PG_CONFIG: {
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PWD,
          port: process.env.DB_PORT,
     },
};
