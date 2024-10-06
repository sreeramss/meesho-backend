const mongoose =require("mongoose")
require('dotenv').config();

//Mongodb connection 

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB");
        
    } catch (error) {
        console.log("Error connecting to DB",error);
        
    }
}

module.exports = connectDB