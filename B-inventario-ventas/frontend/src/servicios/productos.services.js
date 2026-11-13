import api from "./api.js"


export async function listarProductos() {
    const respuesta = await api.get("/productos")
    return respuesta.data
}

export async function buscarProducto(id) {
    const respuesta = await api.get(`/productos/${id}`)
    return respuesta.data
}

export async function crearProducto(datos) {
    const respuesta = await api.post("/productos", datos)
    return respuesta.data
}

export async function actualizarProducto(id, datos) {
    const respuesta = await api.post(`/productos/${id}`, datos)
    return respuesta.data 
}

export async function eliminarProducto(id) {
    const respuesta = await api.delete(`/productos/${id}`)
    return respuesta.data
}

export async function productosDisponibles() {
    const respuesta = await api.get("/productos/disponibles")
    return respuesta.data
}

export async function bajoStock() {
    const respuesta = await api.get("/productos/stock-bajo")
    return respuesta.data
}