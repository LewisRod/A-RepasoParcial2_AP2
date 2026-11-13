import * as Notifications from "expo-notifications";

// SOLICITAR PERMISOS
export async function solicitarPermisos() {
    const { granted } = await Notifications.requestPermissionsAsync()
    
    if (!granted) {
        console.log("permisos denegados")
    }

  return granted
}


// MOSTRAR NOTIFICACION
export async function mostrarNotificacion() {
  const permiso = await solicitarPermisos();

  if (!permiso) {
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Venta registrada",
      body: "La venta se ha registrado correctamente.",
    },
    trigger: null,
  });
}
