import api from "./api.js"

export async function crearVenta(datos) {
    const respuesta = await api.post("/ventas", datos)
    return respuesta.data
}

export async function listarVentas() {
    const respuesta = await api.get("/ventas")
    return respuesta.data
}


export async function misVentas() {
    const respuesta = await api.get("/ventas/mis-ventas")
    return respuesta.data
}


export async function buscarVentas(id) {
    const respuesta = await api.get(`/ventas/${id}`)
    return respuesta.data
}

export async function cambiarEstado(id,datos) {
    const respuesta = await api.put(`/ventas/${id}/estado`,datos)
    return respuesta.data
}

