const User = require("../models/users.model");
const {createToken} = require("../utilities/jwt");

// Endpoint to register the user 
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).send({ message: "Registration successful" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Registering user", error: error.message });
  }
};

// Endpoint to login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }
        const passwordMatch = await user.matchPassword(password);
        if (!passwordMatch) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }
        const token = createToken({ id: user._id });
        res.cookie("authToken", token, {
            path: "/",
            expires: new Date(Date.now() + 3600000),
            secure: true,
            httpOnly: true,
            sameSite: "None"
        });
        delete user.password
        // Send user ID along with the message and token
        return res.status(200).send({
            message: "User Logged in successfully",
            token,
            user  });
    } catch (error) {
        return res.status(500).send({ message: "Error in Logging the user", error: error.message });
    }
};
// To logout and to remove the cookie stored 
const logout =async (req,res)=>{
    res.clearCookie("authToken");
    return res.status(200).send({message:"User Logout successfully"})
}

// To delete the user 
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        return res.status(200).send({message:"User deleted successfully"})
    } catch (error) {
        return res.status(401).send({message:"Error in deleting the user",error:error.message})
    }
}

// TO get the user by the user ID
const getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId); // Fetch user by ID
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      return res.status(200).send({
        name: user.name,
        email: user.email,
        // Add any other details you want to send
      });
    } catch (error) {
      return res.status(500).send({ message: "Error fetching user", error: error.message });
    }
  };
  module.exports = { signup, login, logout, deleteUser, getUserById };
