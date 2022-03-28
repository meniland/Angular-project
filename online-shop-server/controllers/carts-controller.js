const cartsLogic = require("../logic/carts-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');

router.post("/", async (request, response, next) => {
    let cartData = request.body;
    try {
        let cartId = await cartsLogic.addCart(cartData);
        response.json(cartId);
    }
    catch (error) {
        return next(error);
    }
});

router.delete("/:cartId", async (request, response, next) => {
    let cartId = request.params.cartId;
    try {
         await cartsLogic.deleteCart(cartId);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

router.get("/:userId", async (request, response, next) => {
    let userId = request.params.userId;
    try {
        let dbResponse = await cartsLogic.getCartIdByUserId(userId);
        response.json(dbResponse);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;