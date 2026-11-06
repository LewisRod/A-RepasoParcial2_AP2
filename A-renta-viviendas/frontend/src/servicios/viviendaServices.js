import api from "./api.js";

export const listarViviendas = async () => {
  const respuesta = await api.get("/viviendas");
  return respuesta.data;
};

export const buscarVivienda = async (id) => {
  const respuesta = await api.get(`/viviendas/${id}`);
  return respuesta.data;
};

export const viviendasDisponibles = async () => {
  const respuesta = await api.get("/viviendas/disponibles");
  return respuesta.data;
};

export const crearVivienda = async (datos) => {
  const respuesta = await api.post("/viviendas", datos);
  return respuesta.data;
};

export const actualizarVivienda = async (id, datos) => {
  const respuesta = await api.put(`/viviendas/${id}`, datos);
  return respuesta.data;
};

export const eliminarVivienda = async (id) => {
  const respuesta = await api.delete(`/viviendas/${id}`);
  return respuesta.data;
};
