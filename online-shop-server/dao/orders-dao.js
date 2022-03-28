const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addOrder(orderData) {
    let sql = "INSERT INTO orders (userId, cartId, totalPrice, city, street, orderDate, shippingDate, creditNumber)  values(?, ?, ?, ?, ?, ?, ?, ?)";
    let parameters = [orderData.userId, orderData.cartId, orderData.totalPrice, orderData.city, orderData.street, orderData.orderDate, orderData.shippingDate, orderData.creditNumber];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(orderData), e);
    }
}

async function getShippingDates(){
    let sql = "select shippingDate from orders";
    try {
       let shippingDates = await connection.executeWithParameters(sql);
        return shippingDates;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }
}

async function getOrderByCartId(cartId){
    let sql = "SELECT * FROM online_shop.orders where cartId = ?";
    let parameters = [cartId[0].cartId]
    try {
       let order = await connection.executeWithParameters(sql, parameters);
        return order;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartId), e);
    }
}

module.exports = {
    addOrder,
    getShippingDates,
    getOrderByCartId
}