const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "127.0.0.1", // HOST NAME
    user: "root", // USER NAME
    database: "user_reg", // DATABASE NAME
    password: "123456", // DATABASE PASSWORD
    port: 3307,
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;