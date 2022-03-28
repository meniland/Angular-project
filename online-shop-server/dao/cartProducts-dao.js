const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getCartProductsByCartId(cartId) {
    let sql = `select cp.*, cp.totalPrice as price, cp.productId as id, p.productname, p.image 
    from cart_products cp join products p
    on cp.productId = p.id
    where cartId = ?`;
    let parameters = [cartId];
    try {
        let cartProducts = await connection.executeWithParameters(sql, parameters);
        return cartProducts;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}

async function addCartProduct(cartProductData) {
    let sql = `select price from products where id = ?`;
    let parameters = [cartProductData.productId];
    try {
        let price = await connection.executeWithParameters(sql, parameters);

        price = price[0].price;
        cartProductData.totalPrice = price * cartProductData.amount;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartProductData), e);
    }

    sql = "insert into online_shop.cart_products (cartId, productId, amount, totalPrice) values(?,?,?,?) ";
    parameters = [cartProductData.cartId, cartProductData.productId, cartProductData.amount, cartProductData.totalPrice]
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartProductData), e);
    }
}

async function deleteCartProduct(cartId, productId) {
    if (productId == 0) {
        let sql = "delete from online_shop.cart_products where cartId = ?";
        let parameters = [cartId];
        try {
            await connection.executeWithParameters(sql, parameters);
        }
        catch (e) {
            throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
        }
    }
    else {
        let sql = "delete from online_shop.cart_products where cartId = ? and productId = ?";
        let parameters = [cartId, productId];
        try {
            await connection.executeWithParameters(sql, parameters);
        }
        catch (e) {
            throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
        }
    }
}


async function getTotalPrice(cartId) {
    let sql = `SELECT sum(totalPrice) as totalPrice FROM online_shop.cart_products where cartId = ?`;
    let parameters = [cartId];
    try {
        let totalPrice = await connection.executeWithParameters(sql, parameters);
        return totalPrice[0].totalPrice;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}




module.exports = {
    addCartProduct,
    deleteCartProduct,
    getCartProductsByCartId,
    getTotalPrice
}