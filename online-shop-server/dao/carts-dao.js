const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function addCart(cartData) {
    let sql = "insert into online_shop.carts (userId, creationDate) values(?,?) ";
    let parameters = [cartData.userId, cartData.creationDate]
    let cartId;
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartData), e);
    }

    sql = "select cartId from carts where userId = ? and creationDate = ?";
    parameters = [cartData.userId, cartData.creationDate]
    try {
        cartId = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(cartData), e);
    }
    return cartId;
}

async function deleteCart(cartId){
    let sql = "delete from carts where cartId = ?";
    let parameters = [cartId];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}


async function getCartIdByUserId(userId){
    let sql = "SELECT cartId FROM online_shop.carts where userId = ? order by cartId desc limit 1";
    let parameters = [userId];

    try {
     let cartId = await connection.executeWithParameters(sql, parameters);
     return cartId;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, parameters, e);
    }
}



module.exports = {
    addCart,
    deleteCart,
    getCartIdByUserId
}