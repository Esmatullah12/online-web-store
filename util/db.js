const Sequelize = require('sequelize');

const sequelize = new Sequelize("store_ççdb", "root", "esm.mysql240F", {dialect: "mysql", host: "localhost"});

module.exports = sequelize;