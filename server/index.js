import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"

dotenv.config()
const app = express()

app.set("trust proxy", 1)

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173"
].filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server) or matching allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("CORS policy violation: origin not allowed"))
        }
    },
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
    connectDb()
})