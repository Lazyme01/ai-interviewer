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

const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.trim().replace(/\/+$/, "") : null

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        const normalized = origin.replace(/\/+$/, "")
        if (
            normalized === "http://localhost:5173" ||
            (clientUrl && normalized === clientUrl) ||
            normalized.endsWith(".vercel.app")
        ) {
            return callback(null, true)
        }
        return callback(null, false)
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
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