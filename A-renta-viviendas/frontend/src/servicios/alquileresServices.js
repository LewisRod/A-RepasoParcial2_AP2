import api from "./api.js"

export async function alquilarVivienda(datos) {
    const respuesta = await api.post("/alquiler", datos)
    return respuesta.data
}

export async function listarAlquileres() {
    const respuesta = await api.get("/alquiler")
    return respuesta.data
}

export async function misAlquileres() {
    const respuesta = await api.get("/alquiler/mis-alquileres");
    return respuesta.data
}

export async function cambiarEstadoAlquiler(id, datos) {
    const respuesta = await api.put(`/alquiler/${id}`, datos)
    return respuesta.data
}