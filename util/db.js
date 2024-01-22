const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "store_db",
    password: "esm.mysql240F"
});

module.exports = pool.promise();