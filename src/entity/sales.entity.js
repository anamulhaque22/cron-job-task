var EntitySchema = require('typeorm').EntitySchema

const Sales = new EntitySchema({
    name: 'sales',
    tableName: 'sales',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        product_id: {
            type: 'int',
            required: true
        },
        quantity_sold: {
            type: 'int',
            required: true
        },
        sale_date: {
            type: 'timestamp',
            required: true
        }
    }
})
module.exports = Sales
