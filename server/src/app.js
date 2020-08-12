/*
 * Created on Thu Aug 13 2020
 * Authored by Namila Bandara
 * Copyright (c) 2020 https://namila.me
 */

const config = require("./config/config")
const express = require("express")
const bodyParser = require("body-parser")
const errorHandler = require("./middleware/errorHandler")
const morgan = require('morgan')
const cors = require("cors")
const router = require("./router/router")
const helmet = require("helmet")
const passport = require("passport")
const passportService = require("./services/passport")
const sequelize = require("./services/sequelize")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))
app.use(helmet())


app.use(passport.initialize())
passport.use('facebook', passportService.fbOauth)

app.use("/api/",router)

app.use(errorHandler)

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')})
    .then(async () => {
        config.isDev() ? await sequelize.sync({ force: true }) : await sequelize.sync({ alter: true })
        console.log('Tables Created')
    })
    .catch((error)=>{
        console.error('Unable to connect to the database:', error)})


app.listen(config.port,() => {
 console.log(`${config.app} App run in PORT:${config.port}`)
})
