/* eslint-disable no-undef */
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const environment = process.env.NODE_ENV || 'development'
const { getRepository } = require('typeorm')
const { getLogger } = require('../utils/winston')
const moment = require('moment')

const errorConverter = async (err, req, res, next) => {
    let error = err

    // TypeORM error
    if (!(error instanceof ApiError)) {
        const repository = getRepository(error.constructor.name)
        if (repository) {
            const statusCode = error.statusCode || httpStatus.BAD_REQUEST

            const message = error.message || 'Bad Request'
            error = error = new ApiError(statusCode, message, false, err.stack)
        } else {
            const statusCode = error.statusCode || 500

            const message = error.message || 'Internal Server Error'
            error = error = new ApiError(statusCode, message, false, err.stack)
        }
    }

    next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = async (err, req, res, next) => {
    let { statusCode, message } = err
    if (environment === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }

    res.locals.errorMessage = err.message

    const response = {
        code: statusCode,
        message,
        ...(environment === 'development' && { stack: err.stack })
    }

    let logData
    logData = {
        method: req.method,
        url: req.originalUrl
    }
    if (req.params) {
        logData.params = req.params
    }
    if (req.query) {
        logData.query = req.query
    }

    const logger = await getLogger()
    logger.info(
        `statusCode : ${statusCode} ${moment().format('MMMM Do YYYY, h:mm:ss a')} - ${message} - ${JSON.stringify(logData)}`
    )

    res.status(statusCode).send(response)
}

module.exports = {
    errorConverter,
    errorHandler
}
