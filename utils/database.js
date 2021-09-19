const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'dbperpus', // the shcema name
  password: "password",
});

module.exports = pool.promise();
