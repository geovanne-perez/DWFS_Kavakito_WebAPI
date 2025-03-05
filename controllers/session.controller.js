const { response, request } = require("express");
const User = require("../models/user.model");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req = request, res = response) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                message: "Name and password are required"
            })
        }
        const user = await User.findOne({ username: username, active: true })
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        const validPassword = await bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                message: "The username or password does not correspond"
            })
        }
        const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.json({
            message: "Login successful",
            token
        })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error logging in",
            error
        })
    }
}
const checkToken = async (req = request, res = response, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({
                message: "Token is required"
            });
        }
        const tokenWithoutBearer = token.replace("Bearer ", "");
        console.log(jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY));
        const { user } = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
        console.log(user);
        req.user = user;
        //remove user password
        delete user.password;
        res.json({
            message: "Token is valid",
            user
        })
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Invalid token",
            error
        });
    }
};

module.exports = {
    login,
    checkToken  
}
