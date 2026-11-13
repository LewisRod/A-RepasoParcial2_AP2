import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  crearVenta,
  listarVentas,
  misVentas,
} from "../controllers/ventas.controller.js";

const router = Router();

router.post("/", authMiddleware, crearVenta);

router.get("/", authMiddleware, listarVentas);

router.get("/mis-ventas", authMiddleware, misVentas);

export default router;
