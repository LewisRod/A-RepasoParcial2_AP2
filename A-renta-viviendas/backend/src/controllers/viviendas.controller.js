import prisma from "../db.js";

export const listarViviendas = async (req, res) => {
  const viviendas = await prisma.vivienda.findMany();

  return res.status(200).json(viviendas);
};

export const buscarVivienda = async (req, res) => {
  const id = parseInt(req.params.id);
  const vivienda = await prisma.vivienda.findUnique({
    where: { id: id },
  });

  return res.status(200).json(vivienda);
};

export const viviendasDisponibles = async (req, res) => {
  const viviendas = await prisma.vivienda.findMany({
    where: { disponible: true },
  });

  return res.status(200).json(viviendas);
};

export const crearVivienda = async (req, res) => {
  const { titulo, descripcion, direccion, precioMensual, habitaciones } =
    req.body;

  if (req.usuario.rol != "propietario") {
    return res
      .status(403)
      .json({
        mensaje: "solo los propietario tienen permiso de crear viviendas",
      });
  }

  const vivienda = await prisma.vivienda.create({
    data: {
      titulo,
      descripcion,
      direccion,
      precioMensual,
      habitaciones,
      propietarioId: req.usuario.id,
    },
  });

  return res.status(201).json(vivienda);
};



export const actualizarVivienda = async (req, res) => {
  const { titulo, descripcion, direccion, precioMensual, habitaciones, disponible } = req.body;
  const id = parseInt(req.params.id);

  if (req.usuario.rol !== "propietario") {
    return res.status(403).json({ mensaje: "No tienes permisos para actualizar viviendas" });
  }

  const viviendaExistente = await prisma.vivienda.findUnique({
    where: { id }
  })

  if (!viviendaExistente) {
    return res.status(404).json({ mensaje: "Vivienda no encontrada" });
  }

  if ( req.usuario.rol === "propietario" &&viviendaExistente.propietarioId !== req.usuario.id
  ) {
    return res.status(403).json({
      mensaje: "Solo puedes modificar tus propias viviendas",
    });
  }

  const vivienda = await prisma.vivienda.update({
    where: { id },
    data: { titulo, descripcion, direccion, precioMensual, habitaciones, disponible }
  })

    return res.status(200).json({ mensaje: "Vivienda actualizada correctamente", vivienda })
}



export const eliminarVivienda = async (req, res) => {
  const id = parseInt(req.params.id)

  if (req.usuario.rol !== "propietario") {
    return res.status(403).json({ mensaje: "No tienes permisos para eliminar viviendas" });
  }

  const viviendaExistente = await prisma.vivienda.findUnique({
    where: { id }
  })

  if (!viviendaExistente) {
    return res.status(404).json({ mensaje: "Vivienda no encontrada" });
  }

  if (req.usuario.rol === "propietario" && viviendaExistente.propietarioId !== req.usuario.id) {
    return res.status(403).json({
      mensaje: "Solo puedes eliminar tus propias viviendas",
    })
  }

  const vivienda = await prisma.vivienda.delete({
    where: { id }
  });

  return res.status(200).json({ mensaje: "Vivienda eliminada correctamente",vivienda});
};