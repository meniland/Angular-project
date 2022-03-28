const cartProductLogic = require("../logic/cartProducts-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');

router.get("/:id", async (request, response, next) => {
    let cartId = request.params.id;
    try {
      let cartProducts =  await cartProductLogic.getCartProductsByCartId(cartId);
        response.json(cartProducts);
    }
    catch (error) {
        return next(error);
    }
});

router.post("/", async (request, response, next) => {
    let cartProductData = request.body;
    try {
        await cartProductLogic.addCartProduct(cartProductData);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

router.delete("/:cartId/:productId", async (request, response, next) => {
    let cartId = request.params.cartId;
    let productId = request.params.productId;
    try {
        await cartProductLogic.deleteCartProduct(cartId, productId);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;