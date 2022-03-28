const cartProductDao = require("../dao/cartProducts-dao");

async function getCartProductsByCartId(cartId) {

   let cartProducts =  await cartProductDao.getCartProductsByCartId(cartId);
   return cartProducts;
}

async function addCartProduct(cartProductData) {

    await cartProductDao.addCartProduct(cartProductData);
   
}

async function deleteCartProduct(cartId, productId) {

    await cartProductDao.deleteCartProduct(cartId, productId);
   
}

module.exports = {
    addCartProduct,
    deleteCartProduct,
    getCartProductsByCartId
}