import api from "./api.js"

export async function listarViviendas() {
  const respuesta = await api.get("/viviendas")
  return respuesta.data
}

export async function buscarVivienda(id) {
  const respuesta = await api.get(`/viviendas/${id}`)
  return respuesta.data
}

export async function crearVivienda(datos) {
  const respuesta = await api.post("/viviendas", datos)
  return respuesta.data
}

export async function actualizarVivienda(id, datos) {
  const respuesta = await api.put(`/viviendas/${id}`, datos)
  return respuesta.data
}

export async function eliminarVivienda(id) {
  const respuesta = await api.delete(`/viviendas/${id}`)
  return respuesta.data
}

export async function viviendasDisponible() {
  const respuesta = await api.get("/viviendas/disponibles")
  return respuesta.data
}