// Basic lib
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
const app = new express()

const dotenv = require('dotenv')
dotenv.config()

const httpStatus = require('http-status')
const ApiError = require('./src/utils/ApiError')
const { errorConverter, errorHandler } = require('./src/middlewares/error')
const router = require('./src/routes')
const dataSource = require('./src/db/dataSource')
const { CronnController } = require('./src/controllers/corn.controller')

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())
// parse urlencoded request body
app.use(express.urlencoded({ extended: false }))

// log http requests
app.use(morgan('dev'))

// request rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter)

// enable cors
app.use(cors({ credentials: true, origin: true }))
app.options('*', cors())

//  database connection
dataSource
    .initialize()
    .then(() => {
        console.log('Database connected')
    })
    .catch((error) => console.log(error))

// Cron job running every hour
CronnController.runCronJob()

// Routing
app.use('/api/v1', router)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
