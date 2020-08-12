/*
 * Created on Thu Aug 13 2020
 * Authored by Namila Bandara
 * Copyright (c) 2020 https://namila.me
 */

const passport = require('passport')
const authorizeError = require ('../errors/authorizeError')

const passportJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, userId) => {
        if(error || !userId) {
            throw new authorizeError('User', "User not Authorized.")
        } else {
            req.userId = userId    
            next()
        }
    
    })(req, res, next)
}

module.exports = passportJWT
