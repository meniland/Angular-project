const ordersLogic = require("../logic/orders-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');


router.post("/", async (request, response, next) => {

    let orderData = request.body;
    // let token = request.headers.authorization;
    // let decoded = jwt_decode(token);
    // let userId = decoded.userId;
    // orderData.userId = userId;
    try {
       await ordersLogic.addOrder(orderData);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;