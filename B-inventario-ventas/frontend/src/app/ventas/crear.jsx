import { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { router } from "expo-router"
import { crearVenta } from "../../servicios/ventas.services.js"
import { mostrarNotificacion } from "../../servicios/notificaciones.services.js"

export default function CrearVenta() {
  const [productoId, setProductoId] = useState(0)
  const [cantidad, setCantidad] = useState(0)

  async function handleCrear() {
    try {
      await crearVenta({
        productoId: Number(productoId),
        cantidad: Number(cantidad),
      })

      await mostrarNotificacion()

      Alert.alert("Correcto", "Venta registrada correctamente", [{ text: "Continuar", onPress: () => router.replace("/ventas") }])

    } catch (error) {
      console.log("ERROR VENTA:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        "No se pudo registrar la venta" ||
          error.response?.data?.mensaje ||
          error.message,
      );
    }
  }

  return (
    <View style={{ padding: 110 }}>
      <Text>Registrar venta</Text>

      <Text>ID del producto</Text>
      <TextInput
        placeholder="Ingrese el ID del producto"
        value={productoId}
        onChangeText={setProductoId}
        keyboardType="numeric"
      />

      <Text>Cantidad</Text>
      <TextInput
        placeholder="Ingrese la cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />

      <Button title="Registrar venta" onPress={handleCrear} />
    </View>
  );
}
