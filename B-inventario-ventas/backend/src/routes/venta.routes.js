import Router from "express"
import { crearVenta, listarVentas, misVentas, buscarVentas, cambiarEstado } from "../controllers/ventas.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
 

const router = Router()

router.post("/", authMiddleware, crearVenta)
router.get("/", authMiddleware, listarVentas)
router.get("/mis-ventas", authMiddleware, misVentas)
router.get("/:id", authMiddleware, buscarVentas)
router.put("/:id/estado", authMiddleware, cambiarEstado)

export default router