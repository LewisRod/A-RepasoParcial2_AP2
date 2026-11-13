import api from "./api.js"

export async function registrarUsuario(datos) {
    const respuesta = await api.post("/auth/register", datos)
    return respuesta.data
}


export async function login(datos) {
    const respuesta = await api.post("/auth/login", datos)
    return respuesta.data
}