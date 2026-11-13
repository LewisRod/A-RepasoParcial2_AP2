import prisma from "../db.js"


export const listarProductos = async (req, res) => {
    const productos = await prisma.producto.findMany()

    return res.status(200).json(productos)
}


export const buscarProducto = async (req, res) => {
    const id = parseInt(req.params.id)
    
    const producto = await prisma.producto.findUnique({
        where:{id}
    })

    if (!producto) {
        return res.status(404).json({mensaje:"producto no encontrado"})
    }

    return res.status(200).json(producto)
}


export const crearProducto = async (req, res) => {
  const { nombre, categoria, precio, stock, disponible } = req.body;

  if (req.usuario.rol !== "admin") {
    return res.status(403).json({ mensaje: "Solo los administradores pueden crear productos" });
  }

  if (!nombre || !categoria || precio == null || stock == null) {
    return res.status(400).json({ mensaje: "Faltan campos por llenar" });
  }

  const producto = await prisma.producto.create({
    data: { nombre, categoria,precio: Number(precio),stock: Number(stock),disponible},
  })

  return res.status(201).json(producto)
}


export const actualizarProducto = async (req, res) => {
    const id = parseInt(req.params.id)
    const { nombre, categoria, precio, stock, disponible } = req.body
    
    const producto = await prisma.producto.findUnique({
        where:{id}
    })

    if (!producto) {
        return res.status(404).json({mensaje:"producto no encontrado"})
    }

    const actualizado = await prisma.producto.update({
      where: {id},
      data: { nombre, categoria,precio: Number(precio), stock: Number(stock), disponible }
    });


    return res.status(404).json({mensaje:"producto actualizado",actualizado})
}



export const eliminarProducto = async (req, res) => {
  const id = parseInt(req.params.id)

  if (req.usuario.rol !== "admin") {
    return res.status(403).json({ mensaje: "Solo los administradores pueden eliminar productos" });
  }

  const producto = await prisma.producto.findUnique({
    where: { id }
  })

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  const ventas = await prisma.venta.findFirst({
    where: { productoId: id },
  })

  if (ventas) {
    return res.status(400).json({ mensaje: "No puedes eliminar un producto que tiene ventas" });
  }

  await prisma.producto.delete({
    where: { id },
  })

  return res.status(200).json({ mensaje: "Producto eliminado correctamente" });
}




export const productosDisponibles = async (req, res) => {
    const producto = await prisma.producto.findMany({
        where:{disponible:true}
    })

    return res.status(200).json(producto)
}



export const bajoStock = async (req, res) => {
  const productos = await prisma.producto.findMany({
    where: { stock: { lte: 5 } },
  });

  return res.status(200).json(productos);
};

