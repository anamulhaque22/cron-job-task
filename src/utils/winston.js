const winston = require('winston')
const winstonDaily = require('winston-daily-rotate-file')

async function getLogger() {
    try {
        return winston.createLogger({
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: 'logs-%DATE%.log',
                    frequency: '60m',
                    datePattern: 'YYYY-MM-DD-HH-mm',
                    maxSize: '100k',
                    maxFiles: '2',
                    dirname: 'logs'
                })
            ]
        })
    } catch (error) {
        console.log('Error occurred in getLogger: ', error.message)
    }
}

module.exports = { getLogger }
