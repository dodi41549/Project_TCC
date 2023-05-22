const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "database_swalayan"
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
    con.query('select * from user', function (err, result){
        if (err) throw err;
        console.log(result);
    });
    con.end();
});

