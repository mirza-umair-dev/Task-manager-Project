import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { generateToken } from "../utils/GenerateToken.js";
dotenv.config();


export const registerUser = async (req, res) => {
    const { name, email, password, profileImgUrl, adminInviteToken } = req.body;
    let role;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = 'admin';
        } else {
            role = 'user';
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            profileImgUrl
        });
const token = generateToken(newUser._id);
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            profileImgUrl: newUser.profileImgUrl,
            token
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'invalid email or pasword' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid Password or email'
            })
        }

        const token = generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImgUrl: user.profileImgUrl,
            token
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server error' });
    }
}

export const getProfile = async (req, res) => {
    const user = req.user;

    res.status(200).json({
        user
    })
}