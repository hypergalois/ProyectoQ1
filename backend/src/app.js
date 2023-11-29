import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

import authRoutes from "./routes/auth.routes.js"
import recipeRoutes from "./routes/recipes.routes.js"

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

// esto no se para que lo he puesto
// app.use(express.urlencoded({ extended: true }))

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/uploads", express.static("uploads"))

app.use("/api", authRoutes)
app.use("/api", recipeRoutes)

export default app