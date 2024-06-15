const { Sequelize } = require('sequelize');

require('dotenv').config();

const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DBNAME = process.env.POSTGRES_DBNAME;
const POSTGRES_ADDRESS = process.env.POSTGRES_ADDRESS;
const POSTGRES_PORT = process.env.POSTGRES_PORT;

const sequelize = new Sequelize(POSTGRES_DBNAME, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_ADDRESS,
  port: POSTGRES_PORT,
  dialect: 'postgres'
});


async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('DATABASE CONNECTED');

        // Синхронизация модели с базой данных
        await sequelize.sync({ force: false }) // ! dev
            .then(() => {
                console.log("All models were synchronized successfully.");
            })
            .catch(err => {
                console.error('Error synchronize models DATABASE:', err);
            });
    } catch (error) {
        console.error('DATABASE ERROR ! :', error);
    }
}


module.exports = {
    sequelize,
    connectToDatabase,
}