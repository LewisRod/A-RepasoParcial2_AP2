import api from "./api.js";

// LISTAR PRODUCTOS
export async function listarProductos() {
  const respuesta = await api.get("/productos");
  return respuesta.data;
}

// BUSCAR PRODUCTO
export async function buscarProducto(id) {
  const respuesta = await api.get(`/productos/${id}`);
  return respuesta.data;
}

// CREAR PRODUCTO
export async function crearProducto(datos) {
  const respuesta = await api.post("/productos", datos);
  return respuesta.data;
}

// ACTUALIZAR PRODUCTO
export async function actualizarProducto(id, datos) {
  const respuesta = await api.put(`/productos/${id}`, datos);
  return respuesta.data;
}

// ELIMINAR PRODUCTO
export async function eliminarProducto(id) {
  const respuesta = await api.delete(`/productos/${id}`);
  return respuesta.data;
}

// PRODUCTOS DISPONIBLES
export async function productosDisponibles() {
  const respuesta = await api.get("/productos/disponibles");
  return respuesta.data;
}

// PRODUCTOS CON STOCK BAJO
export async function bajoStock() {
  const respuesta = await api.get("/productos/stock-bajo");
  return respuesta.data;
}
