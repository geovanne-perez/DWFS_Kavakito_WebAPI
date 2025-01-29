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

module.exports = {
    login
}
