var mysql = require('mysql');

console.log("Host: "+process.env.DB_HOST+
"; Port: "+process.env.DB_PORT+
"; User: "+process.env.DB_USER+
"; Pass: "+process.env.DB_PASS+
"; Database: "+process.env.DB_DATABASE);

var hst = process.env.DB_HOST;
var prt = process.env.DB_PORT;
var usr = process.env.DB_USER;
var pas = process.env.DB_PASS;
var db = process.env.DB_DATABASE;

var connection = mysql.createConnection({
  host: hst,
  port: prt,
  user: usr,
  password: pas,
  database: db
});

connection.connect();

module.exports = connection;