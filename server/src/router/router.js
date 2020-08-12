/*
 * Created on Tue Aug 11 2020
 * Authored by Namila Bandara
 * Copyright (c) namila.me
*/

const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get("/status", (req,res) => {
    res.status(200).send({status:"OK"})
})

router.get('/auth/provider', passport.authenticate('facebook', { scope: 'email' }))

router.get('/auth/provider/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login',
                                      session: false}));

module.exports = router