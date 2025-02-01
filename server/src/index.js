import express from "express"
import dotenv from "dotenv"
import userRouter from "./deviceRoutes/user.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5100

// Middleware
app.use(express.json())


app.use("/api/v1/auth", userRouter)


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})