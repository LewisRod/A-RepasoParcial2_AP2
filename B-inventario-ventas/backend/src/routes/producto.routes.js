import Router from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import {listarProductos,buscarProducto, crearProducto,actualizarProducto,eliminarProducto, productosDisponibles,bajoStock } from "../controllers/producto.controller.js"

const router = Router()


router.get("/", authMiddleware, listarProductos)
router.get("/:id", authMiddleware, buscarProducto)
router.post("/", authMiddleware, crearProducto)
router.put("/:id", authMiddleware, actualizarProducto)
router.delete("/:id", authMiddleware, eliminarProducto)
router.get("/disponibles", authMiddleware, productosDisponibles)
router.get("/stock-bajo",authMiddleware,bajoStock)


export default router