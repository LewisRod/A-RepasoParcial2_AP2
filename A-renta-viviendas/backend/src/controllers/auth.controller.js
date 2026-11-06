import prisma from '../db.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { nombre, email, password, rol } = req.body
    
    if (typeof nombre != "string" || typeof email != "string" || typeof password != "string") {
        return res.status(404).json({mensaje: "Los campos son string"})
    }

    const usuarioExistente = await prisma.usuario.findUnique({
        where: {email}
    })

    if (usuarioExistente) {
        return res.status(403).json({mensaje: "Ya ese usuario existe"})
    }

    const passwordHash = await bcrypt.hash(password,10)

    const registro = await prisma.usuario.create({
        data:{nombre,email,password:passwordHash}
    })

    return res.status(201).json({mensaje: "Usuario creado correctamente",registro})

}


export const login = async (req, res) => {
    const { email, password } = req.body
    
    if ( typeof email != "string" || typeof password != "string") {
      return res.status(404).json({ mensaje: "Los campos son string" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!usuario) {
      return res.status(403).json({ mensaje: "usuario no encontrado" });
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password)
    
      if (!passwordCorrecta) {
        return res.status(401).json({ error: "credenciales incorrectas" });
      }
    
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "20h" },
    );

    return res.status(200).json({ mensaje: "iniciado correctamente", token })
}
