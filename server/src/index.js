import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5100
 
app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})