const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function addProduct(productToAdd) {
    let sql = "INSERT INTO products (productname, categoryId, price, image)  values(?, ?, ?, ?)";
    let parameters = [productToAdd.productname, productToAdd.categoryId, productToAdd.price, productToAdd.image];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(followedVacation), e);
    }
}


async function updateProduct(productToUpdate) {
    let sql = "update online_shop.products set productname=?, categoryId=?, price=?, image=? where id=?";
    let parameters = [productToUpdate.productname, productToUpdate.categoryId, productToUpdate.price, productToUpdate.image, productToUpdate.id];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productToUpdate), e);
    }
}


async function getProductsById(categoryId) {
    let sql = "SELECT * FROM online_shop.products WHERE  (`categoryId` = ?)";
    let parameters = [categoryId];
    try {
        let products = await connection.executeWithParameters(sql, parameters);
        return products;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}


async function getAllProducts() {
    let sql = "SELECT * from online_shop.products";

    try {
        let allProducts = await connection.executeWithParameters(sql);
        return allProducts;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}




module.exports = {
    getAllProducts,
    getProductsById,
    addProduct,
    updateProduct
}