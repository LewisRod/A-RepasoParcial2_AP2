import api from "./api.js";

// CREAR VENTA
export async function crearVenta(datos) {
  const respuesta = await api.post("/ventas", datos);
  return respuesta.data;
}

// LISTAR VENTAS
export async function listarVentas() {
  const respuesta = await api.get("/ventas");
  return respuesta.data;
}

// MIS VENTAS
export async function misVentas() {
  const respuesta = await api.get("/ventas/mis-ventas");
  return respuesta.data;
}
