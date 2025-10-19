import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

// basic configurations
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true , limit: '16kb' }));
app.use(express.static('public'))
app.use(cookieParser());

// CORS Configuration
app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        credentials: true,
        methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

// Routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
app.use("/api/v1/healthcheck", healthcheckRouter);

import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRouter);

app.get('/',(req, res)=>{
    res.send("Hello World!")
})

export default app;