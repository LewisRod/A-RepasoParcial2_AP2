import * as Notifications from "expo-notifications";


export const solicitudPermisos = async () => {
  const { granted } = await Notifications.requestPermissionsAsync();

  if (!granted) {
    console.log("permiso denegado para notificaciones");
  }

  return granted
}


export async function notificarSolicitudAlquiler() {
  await Notifications.scheduleNotificationAsync({
    content: { title: "Solicitud de alquiler", body: "Tu solicitud de alquiler se ha registrado correctamente." },
    trigger: null
  })
}


export async function recordarInicioAlquiler(fechaInicio) {
  await Notifications.scheduleNotificationAsync({
    content: { title: "Inicio de alquiler", body: "Recuerda que hoy comienza tu alquiler." },
    trigger: new Date(fechaInicio)
  })
}


export async function recordarFinAlquiler(fechaFin) {
  await Notifications.scheduleNotificationAsync({
    content: { title: "Finalización de alquiler", body: "Recuerda que hoy finaliza tu alquiler" },
    trigger: new Date(fechaFin)
  })
}
