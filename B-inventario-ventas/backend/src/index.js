import "dotenv/config";
import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import productosRoutes from "./routes/producto.routes.js";
import ventasRoutes from "./routes/venta.routes.js";

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);

app.listen(3000, () => {
  console.log("en el puerto 3000");
});
