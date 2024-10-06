const Product = require("../models/product.model");

//Get all products

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Product not found" });
};

// To Get the Category available 
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

//To get the product based on the category 
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: `No products found in category: ${category}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
};

module.exports = { getProducts, getProductById,getCategories, getProductsByCategory};
