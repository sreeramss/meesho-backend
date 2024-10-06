const express = require('express');
const { getProducts, getProductById, getCategories, getProductsByCategory } = require('../controllers/product.controller');

const productRouter = express.Router();
// products routes
productRouter.get('/', getProducts);
productRouter.get('/categories', getCategories); 
productRouter.get('/category/:category', getProductsByCategory); // Get products by category
productRouter.get('/:id', getProductById);




module.exports = productRouter;
