import prisma from "../db.js"

export const alquilarVivienda = async (req, res) => {
  const { fechaInicio, fechaFin, viviendaId } = req.body;
  const id = parseInt(viviendaId);


  if (req.usuario.rol !== "cliente") {
    return res.status(403).json({ mensaje: "Solo los clientes pueden solicitar alquileres" })
  }

  const inicio = new Date(fechaInicio)
  const fin = new Date(fechaFin)


  const vivienda = await prisma.vivienda.findUnique({
    where: { id }
  })

  if (!vivienda) {
    return res.status(404).json({ mensaje: "Vivienda no encontrada"})
  }

  
  if (!vivienda.disponible) {
    return res.status(400).json({ mensaje: "Vivienda no disponible"})
  }

    
  const alquiler = await prisma.alquiler.create({
    data: { fechaInicio: inicio, fechaFin: fin, usuarioId: req.usuario.id,  viviendaId: id},
  })

  return res.status(201).json({ mensaje: "Solicitud de alquiler registrada correctamente", alquiler })
};


export const listarAlquileres = async (req, res) => {
    
    if (req.usuario.rol != "propietario") {
        return res.status(404).json({ mensaje: "solo los propietarios ven los alquileres" })
    }

    const alquileres = await prisma.alquiler.findMany()

    return res.status(200).json(alquileres)
}



export const misAlquileres = async (req, res) => {

    const id = parseInt(req.usuario.id)
        
    if (req.usuario.rol != "cliente") {
      return res.status(404).json({ mensaje: "solo el cliente ven los alquileres" });
    }

    const alquileres = await prisma.alquiler.findMany({
        where: {usuarioId:id}
    });

    return res.status(200).json(alquileres);
}

export const cambiarEstadoAlquiler = async (req, res) => {

    const { estado } = req.body;
    const id = parseInt(req.params.id)
    let alquiler 

    alquiler = await prisma.alquiler.findUnique({
        where:{id:id}
    })

    if (!alquiler) {
        return res.status(404).json({mensaje:"no existe ese alquiler"})
    }

    if (req.usuario.rol != "propietario") {
        return res.status(403).json({mensaje:"solo los propietarios cambian estados"})
    }

    alquiler = await prisma.alquiler.update({
        where: { id: id },
        data:{estado}
    })

    return res.status(201).json({mensaje:"estado actualizado",alquiler})

}


