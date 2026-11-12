import * as Notifications from "expo-notifications"


export async function solicitarPermisos() {
  const {granted} = await Notifications.requestPermissionsAsync()
  return granted
}

export async function recordarInicioAlquiler(fechaInicio) {
  await Notifications.scheduleNotificationAsync({
    content: { title: "inicio alquiler", body: "Su alquiler acaba d e comenzar" },
    trigger: new Date(fechaInicio)
  })
}

export async function recordarFinAlquiler(fechaFin) {
  await Notifications.scheduleNotificationAsync({
    content: { title: "fin alquiler", body: "su alquiler expiro" },
    trigger: new Date(fechaFin)
  })
}

