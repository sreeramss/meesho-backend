const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// To add the product to the cart 
const addToCart = async (req, res) => {
  try {
    const { userId, productId, size } = req.body; 

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // If product is already in the cart, update the size and quantity
      cart.items[itemIndex].size = size || null;
      cart.items[itemIndex].quantity += 1;
    } else {
      // If product is not in the cart, add it
      cart.items.push({ productId, size: size || null });
    }

    await cart.save();
    return res.status(200).send({ message: "Product added to cart", cart });
  } catch (error) {
    return res.status(500).send({ message: "Error adding to cart", error: error.message });
  }
};

// to get cart items which is added by user
const getCartItems = async (req, res) => {
    try {
      const userId = req.user.id; 
      const cart = await Cart.findOne({ userId }).populate("items.productId");
  
      if (!cart) {
        return res.status(404).send({ message: "Cart is empty" });
      }
  
      res.status(200).send(cart.items);
    } catch (error) {
      res.status(500).send({ message: "Error fetching cart", error: error.message });
    }
  };

//to remove the cart item by the user
  const removeCartItem = async (req, res) => {
    try {
      const  userId = req.user.id;      
      const { productId } = req.params;
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).send({ message: "Cart not found" });
      }
  
      // Remove item by filtering it out
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  
      await cart.save();
      res.status(200).send({ message: "Item removed from cart", cart });
    } catch (error) {
      res.status(500).send({ message: "Error removing item", error: error.message });
    }
  };
module.exports = { addToCart,getCartItems,removeCartItem };
