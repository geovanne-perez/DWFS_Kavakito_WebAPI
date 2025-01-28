const { response, request } = require("express");
const User = require("../models/user.model");

const userGet = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    if (id) {
      const user = await User.findById(id);
      res.status(200).json({
        message: "User retrieved successfully",
        data: user,
      });
    }
    else {
    const users = await User.find();
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting users",
      error,
    });
  }
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
    if (!id) {
      return res.status(400).json({
        message: "Id is required",
      });
    }
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

const userDelete = async (req = request, res = response) => {
  try {
    const { id } = req.query;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
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
