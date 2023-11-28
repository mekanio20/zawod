const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    "brick",
    "postgres",
    "admin",
    {
        dialect: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        logging: false,
        dialectOptions: {
            useUTC: false
        }
    }
);