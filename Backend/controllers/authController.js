import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { getUsersCollection } from "../models/userModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import { ObjectId } from "mongodb";
import { accessCookieOptions, refreshCookieOptions, resetCookieOptions } from "../utils/cookieOptions.js";
import { isValidEmail } from "../utils/validateEmail.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";

import createReqID from "../utils/createReqID.js";

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

        res.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

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

        res.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
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
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await users.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Rate-limit OTP
        if (user.resetPasswordExpires && user.resetPasswordExpires > Date.now() - 60000)
            return res.status(429).json({ message: "Wait 1 minute before requesting another OTP" });

        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);
        const resetRequestId = createReqID();

        await users.updateOne(
            { _id: user._id },
            {
                $set: {
                    resetPasswordToken: hashedOtp,
                    resetPasswordExpires: Date.now() + 2 * 60 * 1000,
                    resetRequestId
                }
            }
        );

        await sendEmail(email, otp);

        res.cookie("resetRequestId", resetRequestId, resetCookieOptions);

        res.json({ message: "Reset OTP sent" });
    } catch (err) {
        console.error("FORGOT PASSWORD ERROR:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const users = getUsersCollection();
        const { email, otp } = req.body;
        const resetRequestId = req.cookies.resetRequestId;

        if (!email || !otp || !resetRequestId)
            return res.status(400).json({ message: "All fields are required" });

        const user = await users.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.resetPasswordToken || !user.resetPasswordExpires || user.resetRequestId !== resetRequestId)
            return res.status(403).json({ message: "Invalid OTP request" });

        if (user.resetPasswordExpires < Date.now())
            return res.status(410).json({ message: "OTP expired" });

        const isValidOtp = await bcrypt.compare(otp, user.resetPasswordToken);
        if (!isValidOtp) return res.status(400).json({ message: "Invalid OTP" });

        // OTP valid → issue reset JWT
        const resetToken = jwt.sign(
            { id: user._id.toString(), resetRequestId },
            process.env.RESET_PASSWORD_JWT_SECRET,
            { expiresIn: "5m" }
        );

        await users.updateOne(
            { _id: user._id },
            { $set: { resetPasswordToken: null, resetPasswordExpires: null } }
        );

        res.clearCookie("resetRequestId", resetCookieOptions)
        res.cookie("resetToken", resetToken, resetCookieOptions);

        res.json({ message: "OTP verified" });
    } catch (err) {
        console.error("VERIFY OTP ERROR:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const users = getUsersCollection();
        const { newPassword } = req.body;
        const resetToken = req.cookies.resetToken;

        if (!resetToken || !newPassword)
            return res.status(400).json({ message: "All fields are required" });

        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.RESET_PASSWORD_JWT_SECRET);
        } catch (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        
        const user = await users.findOne({ _id: new ObjectId(decoded.id) });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.resetRequestId || decoded.resetRequestId !== user.resetRequestId)
            return res.status(403).json({ message: "Reset session mismatch" });

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await users.updateOne(
            { _id: user._id },
            { $set: { password: hashedPassword, resetRequestId: null } }
        );

        res.clearCookie("resetToken", resetCookieOptions);

        res.json({ message: "Password reset successful" });
    } catch (err) {
        console.error("RESET PASSWORD ERROR:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};