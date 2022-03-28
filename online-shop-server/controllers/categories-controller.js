const vacationLogic = require("../logic/categories-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');


router.get("/", async (request, response, next) => {

    try {
        let categories = await vacationLogic.getCategories();
        response.json(categories);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;