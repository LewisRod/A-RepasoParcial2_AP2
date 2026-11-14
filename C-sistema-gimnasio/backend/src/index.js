import "dotenv/config";
import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js"
import authRoutes from "./routes/auth.routes.js"
import planRoutes from "./routes/plan.routes.js"

const app = express();

app.use(express.json());

app.use(loggerMiddleware)
app.use("/auth", authRoutes)
app.use("/plan",planRoutes)

app.listen(3000, () => {
  console.log("tamo en el puerto 3000");
});
