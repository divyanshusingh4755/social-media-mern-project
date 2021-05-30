import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const FindEmail = await User.findOne({ email });
        const FindUsername = await User.findOne({ username });
        if (FindEmail || FindUsername) {
            return res.status(500).json("Email id or username already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username, email, password: hashedPassword
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("Email id not found")
        }
        if (!password) {
            return res.status(500).json("Password is required");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json("wrong password");
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error.message);
    }
}