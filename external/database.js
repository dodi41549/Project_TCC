require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'database_swalayan'
});

module.exports = con;