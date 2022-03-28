const productsDao = require("../dao/products-dao");


async function getProductsById(categoryId) {

    let products = await productsDao.getProductsById(categoryId);

    return products;
}


async function getAllProducts() {

    let allProducts = await productsDao.getAllProducts();

    return allProducts;
}


async function addProduct(productToAdd){
    await productsDao.addProduct(productToAdd)
}

async function updateProduct(productToUpdate){
    await productsDao.updateProduct(productToUpdate)
}


module.exports = {
    getProductsById,
    getAllProducts,
    addProduct,
    updateProduct
}