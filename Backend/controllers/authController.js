import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUsersCollection } from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import { ObjectId } from "mongodb";
import { accessCookieOptions, refreshCookieOptions } from "../utils/cookieOptions.js";
import { isValidEmail } from "../utils/validateEmail.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
    console.log("register called");

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email is not valid" });
        }

        const users = getUsersCollection();

        const existing = await users.findOne({ email });

        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 12);

        const user = {
            name,
            email,
            password: hashed,
            refreshToken: null
        }

        const result = await users.insertOne(user);

        user._id = result.insertedId;

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        await users.updateOne(
            { _id: new ObjectId(user._id) },
            { $set: { refreshToken } }
        )

        res.cookie("accessToken", accessToken, accessCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions);

        res.json({ success: true });

    }
    catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again." })
    }
}

export const login = async (req, res) => {
    console.log("login called");

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password cannot be empty."
            })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email is not valid" });
        }

        const users = getUsersCollection();

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        await users.updateOne(
            { _id: new ObjectId(user._id) },
            { $set: { refreshToken } }
        )

        res.cookie("accessToken", accessToken, accessCookieOptions);
        res.cookie("refreshToken", refreshToken, refreshCookieOptions);

        res.json({ success: true });
    }
    catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again." })
    }
}

export const logout = async (req, res) => {
    console.log("logout called");

    try {
        const users = getUsersCollection();

        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "No token found." })
        }
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (error) {
            return res.status(403).json({ message: "Invalid token." });
        }

        await users.updateOne({ _id: new ObjectId(decoded.id) }, { $set: { refreshToken: null } });

        res.clearCookie("accessToken", { httpOnly: true, sameSite: "Strict" });
        res.clearCookie("refreshToken", { httpOnly: true, sameSite: "Strict" });

        res.json({ success: true });
    }
    catch (error) {
        console.error("LOGOUT ERROR:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again." })
    }
}

// we use refresh token rotation to use security so every time we generate a new refresh token along with new access token

export const refresh = async (req, res) => {
    console.log("refresh called");

    try {
        const users = getUsersCollection();
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "No token found." })
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            // Token invalid or expired
            return res.status(403).json({ message: "Invalid refresh token." });
        }

        const user = await users.findOne({ _id: new ObjectId(decoded.id) });

        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: "Invalid refresh token." })
        }

        const newAccessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);

        await users.updateOne(
            { _id: user._id },
            { $set: { refreshToken: newRefreshToken } }
        )

        res.cookie("accessToken", newAccessToken, accessCookieOptions);
        res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

        res.json({ success: true });
    }
    catch (error) {
        console.error("REFRESH ERROR:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again." })
    }

}

export const forgotPassword = async (req, res) => {
    try {
        const users = getUsersCollection();
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email and password cannot be empty."
            })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email is not valid" });
        }

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = generateOTP();

        await users.updateOne(
            { _id: user._id },
            {
                $set: {
                    resetPasswordToken: otp,
                    resetPasswordExpires: Date.now() + 2 * 60 * 1000
                }
            }
        );

        await sendEmail(
            email,
            otp
        );

        res.json({
            message: "Reset OTP sent"
        });

    }
    catch (error) {
        console.error("Forgot ERROR:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again." })
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const users = getUsersCollection();
        const { email, otp } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email and password cannot be empty."
            })
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email is not valid" });
        }

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (
            user.resetPasswordToken !== otp ||
            user.resetPasswordExpires < Date.now()
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        await users.updateOne(
            { _id: user._id },
            {
                $set: {
                    resetPasswordExpires: Date.now() + 5 * 60 * 1000
                }
            }
        );

        res.json({
            message: "Account verified successfully"
        });
    }
    catch (error) {
        console.error("Forgot ERROR:", error);
        res.status(500).json({ message: "Internal Server Error. Please try again." })
    }
}

export const resetPassword = async (req, res) => {

    const users = getUsersCollection();
    const { email, otp, newPassword } = req.body;

    const user = await users.findOne({ email });

    if (
        user.resetPasswordToken !== otp ||
        user.resetPasswordExpires < Date.now()
    ) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    const password = await bcrypt.hash(newPassword, 12);

    await users.updateOne(
        { _id: user._id },
        {
            $set: {
                password,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            }
        }
    );

    res.json({
        message: "Password reset successful"
    });

};