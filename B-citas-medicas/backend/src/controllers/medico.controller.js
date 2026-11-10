import prisma from "../db.js"

export const listarMedicos = async (req, res) => {
    const medicos = await prisma.medico.findMany()

    return res.status(200).json(medicos)
}


export const crearMedico = async (req, res) => {
    const { nombre, especialidad, precioConsulta } = req.body
    
    if (!nombre || !especialidad || !precioConsulta) {
        return res.status(404).json({mensaje:"faltan datos"})
    }

    if (typeof nombre != "string" || typeof especialidad != "string" || typeof precioConsulta != "string") {
        return res.status(403).json({mensaje:"los datos son string y pecio int"})
    }

    const nuevoMedico = await prisma.medico.create({
        data:{nombre,especialidad,precioConsulta,usuarioId:req.usuario.id}
    })

    return res.status(201).json(nuevoMedico)
}


export const actualizarMedico = async (req, res) => {
    const { nombre, especialidad, precioConsulta, disponible } = req.body
    const id = parseInt(req.params.id)

    const medico = await prisma.medico.findUnique({
        where:{id:id}
    })

    if (req.usuario.rol != "medico") {
        return res.status(403).json({mensaje:"solo los medicos pueden actualizar"})
    }

    if (!medico) {
        return res.status(403).json({mensaje:"no se encuentra el usuario"})
    }


    const actualizar = await prisma.medico.update({
        where: { id: id },  
        data:{nombre,especialidad,precioConsulta,disponible}
    })

    return res.status(200).json({mensaje:"actualizado correctamente",actualizar})
}


export const eliminarMedico = async (req, res) => {
    const id = parseInt(req.params.id)

     const medico = await prisma.medico.findUnique({
       where: { id: id },
     });

     if (req.usuario.rol != "medico") {
       return res
         .status(403)
         .json({ mensaje: "solo los medicos pueden eliminar" });
     }

     if (!medico) {
       return res.status(403).json({ mensaje: "no se encuentra el usuario" });
     }
    
        const eliminar = await prisma.medico.delete({
          where: { id: id }
        })
    
    return res.status(200).json({mensaje:"medico eliminado"})
}



export const medicosDisponibles = async (req, res) => {
    const medicos = await prisma.medico.findMany({
        where:{disponible:true}
    })

    return res.status(200).json(medicos)
}