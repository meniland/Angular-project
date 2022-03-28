const usersController = require("./controllers/users-controller");
const categoriesController = require("./controllers/categories-controller");
const productsController = require("./controllers/products-controller");
const fileController = require("./controllers/files-controller");
const cartsController = require("./controllers/carts-controller");
const cartProductsController = require("./controllers/cartProducts-controller");
const ordersController = require("./controllers/orders-controller");
const express = require("express");
const server = express();
const errorHandler = require("./errors/error-handler");
const fileUpload = require("express-fileupload");
const loginFilter = require('./filters/login-filter');


server.use(fileUpload());
server.use(express.static("files"));

server.use(express.json());

const cors = require("cors");
server.use(cors({ origin: ["http://localhost:3000","http://34.65.1.129","http://localhost:4200"]}));

server.use(loginFilter());

server.use("/users", usersController);
server.use("/categories", categoriesController);
server.use("/products", productsController);
server.use("/files", fileController);
server.use("/carts", cartsController);
server.use("/cartProducts", cartProductsController);
server.use("/orders", ordersController);

server.use(errorHandler);
server.listen(8080,() => console.log("listening on http://localhost:8080"));
