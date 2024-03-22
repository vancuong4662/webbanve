const mysql = require("mysql2");
// Create the connection to database
const connection = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "123456",
  database: "builtmysql",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
