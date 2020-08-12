/*
 * Created on Tue Aug 11 2020
 * Authored by Namila Bandara
 * Copyright (c) 2020 namila.me
 * https://github.com/namila007/oauth2-js-tutorial
 */
require('dotenv').config()

module.exports = {
    port: process.env.SERVER_PORT,
    app: process.env.APP,
    env: process.env.NODE_ENV,
    host: process.env.SERVER_HOST,
    postgres : {
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        user:process.env.PGUSER,
        password:process.env.PGPASSWORD,
        port: process.env.PGPORT
    },
    fb : {
        clientid: process.env.FBCLIENTID,
        appsecret: process.env.FBAPPSECRET
    },
    ngrok : {
        url: process.env.REDIRECT_URL
    },
    jwt: {
        jwtSecret: process.env.JWT_SECRET,
        expire: process.env.EXPIRE_TIME
    },
    isDev() {
        return this.env==="development"
    }
}
