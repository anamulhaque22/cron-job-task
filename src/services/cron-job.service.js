const cron = require('node-cron')
const { faker } = require('@faker-js/faker')

const dataSource = require('../db/dataSource')

const startCronJob = () => {
    // Cron job to run every hour
    cron.schedule("'0 * * * *'", () => {
        console.log('Running cron job...')
        cornTask()
    })
}

async function cornTask() {
    try {
        // Generate dummy sales data
        const dummySalesData = generateDummySalesData(5)

        const salesRepo = dataSource.getRepository('sales')

        await salesRepo.save(dummySalesData)

        console.log('Dummy data saved to database.')
    } catch (error) {
        console.error('Error saving dummy data:', error)
    }
}

function generateDummySalesData(numRecords) {
    const salesData = []

    for (let i = 0; i < numRecords; i++) {
        const product_id = faker.number.int({ min: 1, max: 10000 })
        const quantity_sold = faker.number.int({ min: 1, max: 100 })
        const sale_date = faker.date.recent()

        console.log(typeof product_id, typeof quantity_sold, typeof sale_date)

        salesData.push({ product_id, quantity_sold, sale_date })
    }

    return salesData
}

module.exports.CornService = {
    startCronJob
}
