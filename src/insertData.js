const mongoose = require("mongoose");
const products = require("./utilities/data");
const Product = require("./models/product.model");
const connectDB = require("./config/db");


const insertData = async () => {
    try {
      // Connect to the database
      await connectDB();
  
      // Insert all products at once using insertMany
      await Product.insertMany(products);
  
      console.log('Data inserted successfully');
      
      // Close the database connection after inserting
      mongoose.connection.close();
    } catch (error) {
      console.error('Error inserting data:', error);
      mongoose.connection.close();
    }
  };
  
  insertData();
