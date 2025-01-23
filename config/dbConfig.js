const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Tentukan environment saat ini
const environment = process.env.NODE_ENV || 'development';

// Konfigurasi database berdasarkan environment
const dbConfig = {
    development: {
        host: process.env.DB_HOST_DEV,
        port: process.env.DB_PORT_DEV,
        user: process.env.DB_USER_DEV,
        password: process.env.DB_PASSWORD_DEV,
        database: process.env.DB_NAME_DEV,
    },
    production: {
        host: process.env.DB_HOST_PROD,
        port: process.env.DB_PORT_PROD,
        user: process.env.DB_USER_PROD,
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.DB_NAME_PROD,
    },
};

module.exports = dbConfig[environment];
