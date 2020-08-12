/*
 * Created on Thu Aug 13 2020
 * Authored by Namila Bandara
 * Copyright (c) 2020 https://namila.me
 */
const httpStatus = require('http-status-codes')

class AuthorizeError extends Error {
    constructor (type, message) {
        super( `Authorization Error`)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthorizeError)
        }

        this.type = `${type} Authorization Error`
        this.status = httpStatus.UNAUTHORIZED
        this.details = message
        this.date = new Date().toString()
    }
}
 