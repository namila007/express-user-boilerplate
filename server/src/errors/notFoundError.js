/*
 * Created on Thu Aug 13 2020
 * Authored by Namila Bandara
 * Copyright (c) 2020 https://namila.me
 */
const httpStatus = require('http-status-codes')

class notFoundError extends Error {
    constructor (type, message) {
        super( `${type} NOT FOUND`)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, notFoundError)
        }

        this.type = 'NOT FOUND'
        this.status = httpStatus.NOT_FOUND
        this.details = message
        this.date = new Date().toString()
    }
}
 