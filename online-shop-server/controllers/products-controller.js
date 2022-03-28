const productsLogic = require("../logic/products-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require('jwt-decode');


router.get("/:id", async (request, response, next) => {
    // let token = request.headers.authorization;
    // let decoded = jwt_decode(token);
    // let userId = decoded.userId;
    let categoryId = request.params.id
    try {
        let products = await productsLogic.getProductsById(categoryId);
        response.json(products);
    }
    catch (error) {
        return next(error);
    }
});


router.get("/", async (request, response, next) => {
    
    let allProducts;
    try {
        allProducts = await productsLogic.getAllProducts();
        response.json(allProducts);
    }
    catch (error) {
        return next(error);
    }
});


router.post("/", async (request, response, next) => {
    
    let productToAdd = request.body;
    try {
        await productsLogic.addProduct(productToAdd);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});


router.put("/", async (request, response, next) => {
    
    let productToUpdate = request.body;
    try {
        await productsLogic.updateProduct(productToUpdate);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});




module.exports = router;