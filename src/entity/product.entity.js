var EntitySchema = require('typeorm').EntitySchema

const Product = new EntitySchema({
    name: 'products',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar',
            length: 255,
            required: true
        },
        price: {
            type: 'int',
            required: true
        },
        description: {
            type: 'mediumtext',
            required: true
        },
        quantity: {
            type: 'int',
            required: true
        }
    }
})
module.exports = Product
