
import User from "../models/Farmer.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { generateToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
    try {
        let { email, password, name } = req.body;
        if (!password) {
            req.flash("error", "Password is required");
            return res.redirect("/login");
        }
        let user = await User.findOne({ email: email.trim().toLowerCase() });
        if (user) {
            req.flash("error", "Email already exists");
            return res.redirect("/login");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            name: name.trim().toLowerCase(),
        });

        let token = generateToken(newUser);
        res.cookie("token", token);
        req.flash("success", "Account created successfully!  You can login");
        return res.redirect("/login");
    } catch (err) {
        console.error("Register Error:", err.message);
        req.flash("error", "Something went wrong during registration");
        return res.redirect("/login");
    }

}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            req.flash("error", "Email and password are required");
            return res.redirect("/login");
        }

        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            req.flash("error", "Invalid email or password");
            return res.redirect("/login");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", "Invalid email or password");
            return res.redirect("/login");
        }

        const token = generateToken(user);
        res.cookie("token", token);
        req.flash("success", "Login successful!");
        return res.redirect("/dash");
    } catch (err) {
        console.error("Login Error:", err.message);
        req.flash("error", "Something went wrong during login");
        return res.redirect("/login");
    }
}
export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "");
        res.redirect("/login");
    }
    catch (err) {
        console.log(err);
        res.redirect('/dash')
    }

}


