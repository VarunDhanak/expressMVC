const mysql = require('mysql2');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '123456', {
    dialect:'mysql', 
    host:'localhost'});

module.exports= sequelize;