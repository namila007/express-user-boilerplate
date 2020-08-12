/*
 * Created on Tue Aug 11 2020
 * Authored by Namila Bandara
 * Copyright (c) 2020 namila.me
 */

const { Sequelize } = require('sequelize');
const postgres = require("../config/config").postgres

const sequelize = new Sequelize(postgres.database, postgres.user, postgres.password, {
  host: postgres.host,
  dialect: 'postgres'
  // logging: console.log
});

module.exports = sequelize