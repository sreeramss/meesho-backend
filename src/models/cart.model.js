const mongoose = require("mongoose");
// Cart Schema 
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
      size: { type: String, default: null }, // For clothing items
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
