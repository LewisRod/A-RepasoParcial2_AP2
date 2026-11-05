import "dotenv/config"
import express from "express"
import { loggerMiddleware } from './middlewares/logger.middleware.js'
import authRoutes from "./routes/auth.routes.js"
import alquilerRoutes from "./routes/alquiler.routes.js"
import viviendasRouter from "./routes/vivienda.routes.js"

const app = express()

app.use(express.json())

app.use(loggerMiddleware)
app.use("/auth",authRoutes)
app.use("/alquiler", alquilerRoutes)
app.use("/viviendas",viviendasRouter)

app.listen(3000, () => {
  console.log("tamo en el puerto 3000")
})
