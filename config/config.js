const dotenv = require('dotenv');

dotenv.config();

config = {

    database: {
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },

    port: process.env.PORT || 8080,

}


module.exports = config;