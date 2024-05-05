/* eslint-disable no-undef */
const typeorm = require('typeorm')
var dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        require('../entity/product.entity'),
        require('../entity/sales.entity')
    ],
    synchronize: true
})
module.exports = dataSource
