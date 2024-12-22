const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Configura Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Requiere SSL
      rejectUnauthorized: false, // Permite certificados autofirmados o no verificados
    },
  },
});

try { async () => {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  }  
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;