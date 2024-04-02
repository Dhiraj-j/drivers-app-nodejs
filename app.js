import express from "express";
const app = express();
import path from 'path'
import morgan from "morgan";
import "./src/utils/associations.js"
// importing routes 
import user from "./src/api/user/routes/user.js";
import chat from "./src/api/chat/routes/chat.js";
import upload from "./src/api/upload/upload.js"
import cors from 'cors'
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET'], // Only allow GET requests
    allowedHeaders: ['Content-Type', 'Authorization', "authorization"], // Specify allowed headers
    maxAge: 600,
}))
app.use(morgan("dev"))
app.use(express.json())
app.use("/public", express.static(path.join(process.cwd(), "public")))
app.use(user)
app.use(chat)
app.use(upload)
export default app