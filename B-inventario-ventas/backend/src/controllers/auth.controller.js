import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: "Faltan campos por llenar" });
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email },
  })

  if (usuario) {
    return res.status(400).json({ mensaje: "El usuario ya está registrado" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const nuevoUsuario = await prisma.usuario.create({
    data: { nombre, email,  password: passwordHash, rol: rol || "empleado" }
  })

  return res.status(201).json({ mensaje: "Usuario registrado correctamente", nuevoUsuario })
}






export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({  mensaje: "Faltan campos por llenar" });
  }

  const usuario = await prisma.usuario.findUnique({
      where: { email }
  });

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  const contrasenaCorrecta = await bcrypt.compare(password, usuario.password);

  if (!contrasenaCorrecta) {
    return res.status(401).json({  mensaje: "Contraseña incorrecta"  });
  }

  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: "20h" }
  )

  return res.status(200).json({ mensaje: "Inicio de sesión correcto", token })
}