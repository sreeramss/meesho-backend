const express = require("express")
const dotenv = require('dotenv')
const cors =require("cors");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const cookieParser = require("cookie-parser");
const cartRouter = require("./src/routes/cart.routes");
// For adding env 
dotenv.config();

const app=express();
const PORT= process.env.PORT || 8000;

const corsOptions = {
    origin:process.env.CORS_ORIGIN, // Allow only your frontend origin
    credentials: true, // Allow credentials (cookies)
};
//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
app.use("/api/user",userRouter)
app.use("/api/products",productRouter)
app.use("/api",cartRouter)

// home page 
app.get("/",(req,res)=>{
    res.status(200).send("Welcome")
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is listening on port ${PORT}`);
    
})