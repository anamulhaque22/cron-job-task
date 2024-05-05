const httpStatus = require('http-status')

const { ProductService } = require('../services/product.service')
const catchAsync = require('../utils/catchAsync')

const addProduct = catchAsync(async (req, res) => {
    const product = await ProductService.addProduct(req.body)
    res.status(httpStatus.CREATED).send({ product })
})

const getProducts = catchAsync(async (req, res) => {
    const products = await ProductService.getProducts()
    res.status(httpStatus.OK).send(products)
})

const getProductById = catchAsync(async (req, res) => {
    console.log({ productId: req.params.productId })
    const productId = parseInt(req.params.productId)
    const product = await ProductService.getProductById(productId)

    res.status(httpStatus.OK).send({ product })
})

const updateProduct = catchAsync(async (req, res) => {
    const productId = parseInt(req.params.productId)
    const product = await ProductService.updateProductById(req.body, productId)
    res.status(httpStatus.OK).send({ product })
})

const deleteProduct = catchAsync(async (req, res) => {
    const productId = parseInt(req.params.productId)
    const isDeleted = await ProductService.deleteProductById(productId)
    res.status(httpStatus.OK).send({
        status: 'success',
        message: isDeleted
            ? 'Product deleted successfully'
            : 'Product not found'
    })
})

module.exports.ProductController = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
