const ordersDao = require("../dao/orders-dao");
const cartProductDao = require("../dao/cartProducts-dao");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function addOrder(orderData) {

    orderData.totalPrice = await cartProductDao.getTotalPrice(orderData.cartId);

    let shippingsNumberAtCurrentDate = await validateShippingDate(orderData);

    if (shippingsNumberAtCurrentDate < 3) {
        ordersDao.addOrder(orderData);
    }else{
        throw new ServerError(ErrorType.TOO_MANY_ORDERS_AT_DAY);
    }
}

async function validateShippingDate(orderData) {
    let shippingDates = await ordersDao.getShippingDates();
    let count = 0;
    for (let i = 0; i < shippingDates.length; i++) {
        if (shippingDates[i].shippingDate == orderData.shippingDate) {
            count++
        }
    }
    return count
}

module.exports = {
    addOrder
}