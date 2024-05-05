const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const dataSource = require('../db/dataSource')

const addProduct = async (productData) => {
    const productRepo = dataSource.getRepository('products')
    return await productRepo.save(productData)
}

const getProducts = async () => {
    const productRepo = dataSource.getRepository('products')
    return await productRepo.find()
}

const getProductById = async (id) => {
    const productRepo = dataSource.getRepository('products')
    return await productRepo.findOne({
        where: {
            id
        }
    })
}

const updateProductById = async (productData, productId) => {
    const productRepo = dataSource.getRepository('products')

    const product = await getProductById(productId)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
    }
    const updatedProduct = Object.assign(product, productData)
    console.log({ updatedProduct })
    return await productRepo.save(updatedProduct)
}

const deleteProductById = async (id) => {
    const productRepo = dataSource.getRepository('products')
    const product = await getProductById(id)
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
    }
    return await productRepo.delete(id)
}

module.exports.ProductService = {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}
