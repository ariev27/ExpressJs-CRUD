var DBUtil = require("../modules/util/DBUtil");
var sequelize = require("sequelize");

const Books = DBUtil.define(
  "Books",
  {
    bookId: {
      type: sequelize.NUMBER,
      primaryKey: true,
      autoIncrement: true
      // allowNull: false
    },
    title: sequelize.STRING,
    author: sequelize.STRING,
    price: sequelize.NUMBER,
    stock: sequelize.NUMBER
  },
  { timestamps: false }
);

module.exports = Books;
