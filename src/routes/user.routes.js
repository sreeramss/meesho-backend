const express = require("express");
const { signup, login, logout, deleteUser, getUserById } = require("../controllers/user.controller");
const authentication = require("../middlewares/user.middleware");

const userRouter = express.Router();
// User routes
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.delete("/:id", authentication, deleteUser);
userRouter.get("/:userId", getUserById); // Added route for getting user by ID

module.exports = userRouter;
