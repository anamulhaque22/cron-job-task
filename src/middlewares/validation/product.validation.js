const { check } = require('express-validator')
// const { default: mongoose } = require('mongoose')

const productValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('price').notEmpty().withMessage('Price is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('quantity').notEmpty().withMessage('Quantity is required')
]

module.exports = {
    productValidator
}
