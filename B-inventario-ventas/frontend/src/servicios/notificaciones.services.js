import * as Notifications from "expo-notifications"

export async function solicitarPermisos() {
  const { granted } = await Notifications.requestPermissionsAsync()
  
  if (!granted) {
    console.log("permisos denegados")
  }
}


export async function mostrarNotificacion() {
  const permisos = await solicitarPermisos()

  if (!permisos) {
    return
  }

  await Notifications.scheduleNotificationAsync({
    content: { title: "Venta creada", boby: "venta creada correctamente" },
    trigger: null
  })
}