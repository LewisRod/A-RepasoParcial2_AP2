import prisma from "../db.js"

export const crearVenta = async (req, res) => {
    const { cantidad, precioUnitario, total, fecha, estado } = req.body
    
    if (req.usuario.rol != "empleado") {
        return res.status(404).json({mensaje:"solo los empleados crean ventas"})
    }

    await prisma.producto.update({
        where: { id: req.producto.id },
        data:{stock:{decrement:cantidad}}
    })

    if (!cantidad || !precioUnitario || !total || !fecha) {
        return res.status(404).json({mensaje:"faltan campos"})
    }

    if (cantidad > req.producto.stock) {
        return res.status(403).json({mensaje:"la cantidad es mayor que el stock"})
    }

    const fechaFormateada = new Date(fecha)
    const totalVenta = cantidad * precioUnitario
    

    const nuevaVenta = await prisma.venta.create({
        data:{cantidad,total:totalVenta,fecha:fechaFormateada,estado}
    })

    return res.status(403).json(nuevaVenta)
    
}



export const listarVentas = async (req, res) => {
    const ventas = await prisma.venta.findMany()

    if (req.usuario.rol != "admin") {
        return res.status(404).json({mensaje:"solo los administradores ven todas las ventas"})
    }

    return res.status(200).json(ventas)
}


export const misVentas = async (req, res) => {
    const id = parseInt(req.venta.usuarioId)

    if (id != req.venta.usuarioId) {
        return res.status(404).json({mensaje:"solo puedes ver tus ventas"})
    }

    const ventas = await prisma.venta.findMany({
        where:{usuarioId:req.usuario.id}
    })

    return res.status(200).json(ventas)
}


export const buscarVentas = async (req, res) => {
    const id = parseInt(req.params.id)

    const ventas = await prisma.venta.findUnique({
        where:{id:id}
    })

    return res.status(200).json(ventas)
}


export const cambiarEstado = async (req, res) => {
    const { estado } = req.body
    const id = parseInt(req.params.id)
    let ventas

    if (!estado) {
        return res.status(200).json({mensaje:"faltan campos por llenar"})
    }

    ventas = await prisma.venta.update({
        where: { id: id },
        data:{estado}
    })

    return res.status(200).json({mensaje:"venta actualizada",ventas})
}

