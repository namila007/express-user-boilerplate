/*
 * Created on Tue Aug 11 2020
 * Authored by Namila Bandara
 * Copyright (c) namila.me
*/

const passport = require('passport')
const User = require("../models/user")
const config = require("../config/config")
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const notFoundError = require("../errors/notFoundError")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.jwt.jwtSecret

const fbOauth = new FacebookStrategy({
  clientID: config.fb.clientid,
  clientSecret: config.fb.appsecret,
  callbackURL: 'http://localhost:3030/api/auth/provider/callback',
  profileFields: ['id', 'emails', 'name', 'photos'] 
  },
  async function(accessToken, refreshToken, profile, done) {
    const [user, created] = await User.findOrCreate({
      where: { email: profile.emails[0].value },
      defaults: {
        id: new UUID(),
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        imageUrl: profile.photos[0].value
      }
    })
    let data = {
      user: user,
      fbAccessToken: accessToken,
      created: created
    }
    console.log(data)
    done(null,data)
  }
)

const jwt = new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user = await User.findByPk(jwt_payload.sub) 
    if(!user) {
      throw notFoundError("User Not Found", `User ${jwt_payload.sub} not found`)
    }
    else done(null,user.getInfo())

  } catch (error) {
    done(error,null)
  }

})


module.exports = {
  fbOauth: fbOauth,
  jwt: jwt
}