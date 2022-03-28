const cartsDao = require("../dao/carts-dao");
const ordersDao = require("../dao/orders-dao");

async function addCart(cartData) {

    let cartId = await cartsDao.addCart(cartData);
    cartId = cartId[0];
    return cartId;
}

async function deleteCart(cartId) {

    cartsDao.deleteCart(cartId);

}

async function getCartIdByUserId(userId) {

    let cartId = await cartsDao.getCartIdByUserId(userId);

    if (cartId == null || cartId.length == 0) {
        return 0;
    }

    let order = await ordersDao.getOrderByCartId(cartId);
    if (order.length == 1) {
        return order[0].orderDate;
    }
    return cartId;
}


module.exports = {
    addCart,
    deleteCart,
    getCartIdByUserId
}