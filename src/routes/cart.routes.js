const express = require("express");
const { addToCart, getCartItems, removeCartItem } = require("../controllers/cart.controller");
const authentication = require("../middlewares/user.middleware");
const cartRouter = express.Router();

// Add to cart route
cartRouter.post("/add-to-cart", addToCart);
cartRouter.get("/cart",authentication,getCartItems);
cartRouter.delete("/cart/:productId",authentication,removeCartItem)

module.exports = cartRouter;