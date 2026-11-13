import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const register = async (req, res) => {
    const { nombre, email, password, rol } = req.body
    
    if (!nombre || !email || !password) {
        return res.status(404).json({mensaje:"faltan campos por llenar"})
    }

    if (typeof nombre != "string" || typeof email != "string" || typeof password != "string") {
        return res.status(403).json({mensaje:"los campos son string"})
    }

    const usuario = await prisma.usuario.findUnique({
        where:{email}
    })

    if (usuario) {
        return res.status(400).json({mensaje:"usuario existente"})
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    const nuevoUsuario = await prisma.usuario.create({
        data:{nombre:usuario.nombre,email:usuario.email,password:passwordHash,rol: rol || "cliente"}
    })

    return res.status(201).json({mensaje:"Usuario creado",nuevoUsuario})
}




export const login = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.status(404).json({mensaje:"campos faltantes"})
    }

    if (typeof email != "string" || typeof password != "string") {
        return res.status(403).json({mensaje:"los campos son string"})
    }

    const usuario = await prisma.usuario.findUnique({
        where:{email}
    })

    if (!usuario) {
        return res.status(404).json({mensaje:"usuario no encontrado"})
    }

    const constrasenaCorrecta = await bcrypt.compare(password, usuario.password)

    if (!constrasenaCorrecta) {
        return res.status(404).json({mensaje:"contrasena incorrecta"})
    }

    const token = jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        {expiresIn:"20h"}
    )

    return res.status(201).json({mensaje:"inicio secion correcto",token})
}