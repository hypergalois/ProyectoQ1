import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { createAccessToken } from '../libs/jwt.js';

// {
//     "email": "test1234@gmail.com",
//     "password": "test1234",
//     "username": "test1234"
//   }
export const register = async (req, res) => {
    console.log(req.body)
    const { email, username, password } = req.body
    
    try {
        const foundUser = await User.findOne({ email })
        if (foundUser) return res.status(400).json({ message: "The email is already registered" })

        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = User({
            email,
            username,
            password: passwordHashed
        })
    
        const savedUser = await newUser.save()

        const token = await createAccessToken({ id: savedUser._id })

        res.cookie("token", token, {
            sameSite: "none",
            secure: true
        })

        return res.json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        })

    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
    
}

export const login = async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body
    console.log(email)

    try {
        const foundUser = await User.findOne({ email })

        if (!foundUser) {
            return res.status(400).json({ message: "User not found" })
        }

        console.log(foundUser)
        console.log(foundUser.password)

        const isMatch = await bcrypt.compare(password, foundUser.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        const token = await createAccessToken({ id: foundUser._id })
        console.log(token)

        res.cookie("token", token, {
            sameSite: "none",
            secure: true
        })

        return res.json({
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })

    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "User not found" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies
    
    if (!token) {
        return res.status(400).json({ message: "No token provided" })
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid token" })
        }

        const userFound = await User.findById(user.id)

        if (!userFound) return res.status(400).json({ message: "User not found" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    })
}