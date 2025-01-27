const { response, request } = require("express");
const User = require("../models/user.model");

const userGet = async (req = request, res = response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting users",
      error,
    });
  }
  res.json(users);
};

const userPost = async (req = request, res = response) => {
  try {
    const body = req.body;
    let user = new User(body);
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
};

const userPut = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    const updatedUser = await User.findByIdAndUpdate(id,req.body,{new:true});
    res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating user",
      error,
    });
    
  }
};

const userDelete = (req = request, res = response) => {
  try {
    const { id } = req.query;
    User.findByIdAndDelete(id);
    res.json({
      message: "User deleted successfully",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting user",
      error,
    });
    
  }
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
