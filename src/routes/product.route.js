const express = require('express')
// const handleValidationErrors = require('../middlewares/handleValidationErrors')

const { ProductController } = require('../controllers/product.controller')
const handleValidationErrors = require('../middlewares/validation/handleValidationErrors')
const {
    productValidator
} = require('../middlewares/validation/product.validation')

const router = express.Router()

router.post(
    '/',
    productValidator,
    handleValidationErrors,
    ProductController.addProduct
)
router.get('/', ProductController.getProducts)
router.get('/:productId', ProductController.getProductById)
router.put('/:productId', ProductController.updateProduct)
router.delete('/:productId', ProductController.deleteProduct)

module.exports = router
