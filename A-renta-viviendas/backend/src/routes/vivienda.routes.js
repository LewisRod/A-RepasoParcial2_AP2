import {Router} from "express"
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { listarViviendas,buscarVivienda,viviendasDisponibles,crearVivienda,actualizarVivienda,eliminarVivienda } from "../controllers/viviendas.controller.js";


const router = Router()

router.get("/", authMiddleware, listarViviendas)
router.get("/:id", authMiddleware, buscarVivienda)
router.post("/", authMiddleware, crearVivienda)
router.put("/:id", authMiddleware, actualizarVivienda)
router.delete("/:id", authMiddleware, eliminarVivienda)
router.get("/disponibles", authMiddleware, viviendasDisponibles)


export default router