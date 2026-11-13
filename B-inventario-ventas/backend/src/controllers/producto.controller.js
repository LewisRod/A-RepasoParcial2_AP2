import prisma from "../db.js"


export const listarProductos = async (req, res) => {
    const productos = await prisma.producto.findMany()

    return res.status(200).json(productos)
}


export const buscarProducto = async (req, res) => {
    const id = parseInt(req.params.id)
    
    const producto = await prisma.producto.findUnique({
        where:{id:id}
    })

    if (!producto) {
        return res.status(403).json({mensaje:"producto no encontrado"})
    }

    return res.status(200).json(producto)
}


export const crearProducto = async (req, res) => {
    const { nombre, categoria, precio, stock, disponible } = req.body

    if (req.usuario.rol !== "admin") {
        return res.status(403).json({mensaje:"solo los administradores crean productos"})
    }

    if (
        typeof nombre !== "string" ||
        !nombre.trim() ||
        typeof categoria !== "string" ||
        !categoria.trim() ||
        !Number.isInteger(precio) ||
        precio <= 0 ||
        !Number.isInteger(stock) ||
        stock < 0 ||
        typeof disponible !== "boolean"
    ) {
        return res.status(400).json({
            mensaje: "nombre y categoría son obligatorios; precio debe ser un entero positivo, stock un entero no negativo y disponibilidad un booleano"
        })
    }

    const producto = await prisma.producto.create({
        data:{
            nombre: nombre.trim(),
            categoria: categoria.trim(),
            precio,
            stock,
            disponible
        }
    })

    return res.status(201).json(producto)
}


export const actualizarProducto = async (req, res) => {
    const id = parseInt(req.params.id)
    const { nombre, categoria, precio, stock, disponible } = req.body
    
    const producto = await prisma.producto.findUnique({
        where:{id:id}
    })

    if (!producto) {
        return res.status(404).json({mensaje:"producto no encontrado"})
    }

    const actualizado = await prisma.producto.update({
      where: { id: id },
      data: { nombre, categoria, precio, stock, disponible }
    });


    return res.status(404).json({mensaje:"producto actualizado",actualizado})
}


export const eliminarProducto = async (req, res) => {
    const id = parseInt(req.params.id)

    const producto = await prisma.producto.findUnique({
       where:{id:id} 
    })

    if (!producto) {
        return res.status(404).json({mensaje:"producto no encontrado"})
    }

    const eliminar = await prisma.producto.delete({
        where: { id:id }
    })

    return res.status(200).json({mensaje:"producto eliminado correctamente",eliminar})
}



export const productosDisponibles = async (req, res) => {
    const producto = await prisma.producto.findMany({
        where:{disponible:true}
    })

    return res.status(200).json(producto)
}



export const bajoStock = async (req, res) => {
    let productos

    if (productos.stock > 5) {
        return res.status(400).json({mensaje:"no hay productos con stock bajo"})
    }

   productos = await prisma.producto.aggregate()

    return res.status(200).json(productos)
}

