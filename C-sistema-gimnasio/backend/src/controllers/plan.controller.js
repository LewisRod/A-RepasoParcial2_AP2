import prisma from "../db.js"


export const listarPlanes = async (req, res) => {
    const planes = await prisma.plan.findMany()

    return res.status(200).json(planes)
}




export const crearPlan = async (req, res) => {
    const { nombre, precio, duracionDias, activo } = req.body

        if (req.usuario.rol != "admin") {
          return res
            .status(400)
            .json({ mensaje: "solo los administradores actualizan plan" });
        }
    
    if (!nombre || !precio || !duracionDias) {
        return res.status(404).json({mensaje:"faltan camops por llenar"})
    }

    if (typeof nombre != "string" || typeof precio != "number" || typeof duracionDias != "number") {
        return res.status(400).json({mensaje:"los campos son string y int"})
    }

    const plan = await prisma.plan.create({
        data:{nombre,precio:Number(precio),duracionDias:Number(duracionDias),activo}
    })

    return res.status(201).json(plan)
}




export const actualizarPlan = async (req, res) => {
    const { nombre, precio, duracionDias, activo } = req.body
    const id = parseInt(req.params.id)

    if (req.usuario.rol != "admin") {
        return res.status(400).json({mensaje:"solo los administradores actualizan plan"})
    }

    const plan = await prisma.plan.findUnique({
        where:{id}
    })

    if (!plan) {
        return res.status(404).json({mensaje:"plan no encontrado"})
    }
    
    
    const actualizarPlan = await prisma.plan.update({
        where: { id },
        data:{nombre,precio,duracionDias,activo}
    })

    return res.status(200).json({mensaje:"plan actualizado",actualizarPlan})
    
}




export const eliminarPlan = async (req, res) => {
    const id = parseInt(req.params.id)

        if (req.usuario.rol != "admin") {
          return res
            .status(400)
            .json({ mensaje: "solo los administradores eliminan plan" });
        }
    
        const plan = await prisma.plan.findUnique({
          where: { id },
        });

        if (!plan) {
          return res.status(404).json({ mensaje: "plan no encontrado" });
        }
    
     await prisma.plan.delete({
        where:{id}
    })

    return res.status(200).json({mensaje:"plan eliminado"})
}