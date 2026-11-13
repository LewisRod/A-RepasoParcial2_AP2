import prisma from "../db.js"


export const crearVenta = async (req, res) => {
  const { productoId, cantidad } = req.body;

  if (req.usuario.rol != "empleado") {
    return res.status(403).json({ mensaje: "solo los empleados crean ventas" });
  }

  if (!productoId || !cantidad || cantidad <= 0) {
    return res.status(400).json({ mensaje: "faltan campos" });
  }

  const producto = await prisma.producto.findUnique({
    where: { id: Number(productoId) },
  });

  if (!producto) {
    return res.status(404).json({ mensaje: "producto no encontrado" });
  }

  if (cantidad > producto.stock) {
    return res.status(400).json({ mensaje: "stock insuficiente" });
  }

  const total = cantidad * producto.precio;

  const nuevaVenta = await prisma.venta.create({
    data: {
      cantidad,
      precioUnitario: producto.precio,
      total,
      usuarioId: req.usuario.id,
      productoId: producto.id,
    },
  });

  await prisma.producto.update({
    where: { id: producto.id },
    data: {
      stock: producto.stock - cantidad,
      disponible: producto.stock - cantidad > 0,
    },
  });

  return res.status(201).json({
    mensaje: "venta registrada correctamente",
    venta: nuevaVenta,
  });
};




export const listarVentas = async (req, res) => {
    const ventas = await prisma.venta.findMany()

    if (req.usuario.rol != "admin") {
        return res.status(404).json({mensaje:"solo los administradores ven todas las ventas"})
    }

    return res.status(200).json(ventas)
}



export const misVentas = async (req, res) => {
  const ventas = await prisma.venta.findMany({
    where: { usuarioId: req.usuario.id },
  });

  return res.status(200).json(ventas);
};

