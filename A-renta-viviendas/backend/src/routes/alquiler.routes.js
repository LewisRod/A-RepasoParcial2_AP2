import Router from "express"
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { alquilarVivienda, listarAlquileres, misAlquileres, cambiarEstadoAlquiler } from "../controllers/alquiler.controller.js";


const router = Router()

router.post("/", authMiddleware, alquilarVivienda)
router.get("/", authMiddleware, listarAlquileres)
router.get("/mis-alquileres", authMiddleware, misAlquileres)
router.put("/:id", authMiddleware, cambiarEstadoAlquiler)

export default router
