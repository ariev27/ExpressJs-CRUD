const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("ar_bootcamp", "root", "root", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

// Option 2: Passing a connection URI
// const sequelize = new Sequelize('mysql://user:pass@example.com:5432/dbname');

module.exports = sequelize;
