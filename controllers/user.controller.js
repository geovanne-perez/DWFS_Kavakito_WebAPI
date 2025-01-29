const { response, request } = require("express");
const User = require("../models/user.model");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userGet = async (req = request, res = response) => {
  try {
    const _active = req.query.active || true;
    const users = await User.find({active:_active}, '-password'); // Exclude the password field
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ message: "Users retrieved successfully", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting users", error });
  }
};

const userGetByID = async (req = request, res = response) => {
  try {    const _active = req.query.active; // No default value here

    let query = { _id: req.params.id }; // Start with the ID

    if (_active === 'true' || _active === undefined || _active === null) { // Handle true or null/undefined
      query.active = true;
    } else if (_active === 'false') {
      query.active = false;
    } else {
        return res.status(400).json({ message: "Invalid active parameter. Use 'true' or 'false'"});
    }

    const user = await User.findOne(query, '-password'); // Use findOne with the combined query

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting user", error });
  }
};

const userPost = async (req = request, res = response) => {
  try {
    const { name, email, password } = req.body 
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const DBResponse = await User.create({
      name, 
      email, 
      password: hashedPassword,
      active: true
    })

    // Remove password from DBResponse
    const { password: _, ...user } = DBResponse.toObject();

    res.status(201).json({
      message: "User created successfully",
      data: user
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
  const id = req.params.id;
    console.log(id);
    if (!id || id === "") {
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
    const id = req.params.id;
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
  userGetByID,
  userPost,
  userPut,
  userDelete,
};
