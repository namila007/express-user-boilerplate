/*
 * Created on Tue Aug 11 2020
 * Authored by Namila Bandara
 * Copyright (c) namila.me
 * https://github.com/namila007/oauth2-js-tutorial
*/


const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../services/sequelize")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require('jsonwebtoken')
const jwtConfig = require("../config/config").jwt

class User extends Model {
    jwtSignUser() {
        return jwt.sign(this.id,jwtConfig.jwtSecret, {
            expiresIn: jwtConfig.expire
        })
    }
    matchPassword(value) {
        return bcrypt.compareSync(value, this.password)
    }
    getInfo() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            imageUrl: this.imageUrl
        }
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('password', bcrypt.genSalt(saltRounds, (err,salt)=> {
                bcrypt.hashSync(value,salt)
            }))
        }
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.STRING
    }
}, {
  sequelize, 
  modelName: 'User' 
});

module.exports = User