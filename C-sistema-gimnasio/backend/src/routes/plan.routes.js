import { Router} from "express"
import { listarPlanes, crearPlan, actualizarPlan, eliminarPlan } from "../controllers/plan.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"


const router = Router()

router.get("/", authMiddleware, listarPlanes)
router.post("/", authMiddleware, crearPlan)
router.put(`/:id`, authMiddleware, actualizarPlan)
router.delete("/:id", authMiddleware, eliminarPlan)


export default router