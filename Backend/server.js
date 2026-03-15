import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

// Security libraries
import helmet from "helmet"
import rateLimit from "express-rate-limit"

import { connectDB } from './config.js/db.js';
import authRoutes from './routes/authRoutes.js';
import { xssSanitize } from "./middleware/xssMiddleware.js"
import { sanitizeInputs } from "./middleware/sanitizeMiddleware.js"

dotenv.config();

const app = express();

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URI,
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use(helmet())
app.use(xssSanitize)
app.use(sanitizeInputs)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,// 15 minutes
    max: 100                   // limit each IP to 100 requests per window
})

app.use(limiter)

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () =>{
    console.log("Server Running on port "+ process.env.PORT);
})