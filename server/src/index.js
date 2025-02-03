import express from "express"
import dotenv from "dotenv"
import userRouter from "./deviceRoutes/user.routes.js"
import { EventEmitter } from "events";
import connectDB from "./db/db.js";
dotenv.config()

EventEmitter.defaultMaxListeners = 15; // Increase limit from 10 to 15


const app = express()
const PORT = process.env.PORT || 5100

// Middleware
app.use(express.json())


app.use("/api/v1", userRouter)


app.listen(PORT,()=>{
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`)
})