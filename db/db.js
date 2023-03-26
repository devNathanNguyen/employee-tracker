const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1058',
  database: 'employee_management'
});

module.exports = connection;
