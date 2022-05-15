const config = require('../config/config.js')
const mysql = require('mysql');

let conn = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
});

conn.connect((err) => {

    if (err){
        console.log("Error connecting to database.");
        console.log({ error: err });
        return;
    }

    console.log("Successfully connected to database.");

});


module.exports = conn;