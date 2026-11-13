import { useState, useCallback } from "react"
import { router, useFocusEffect } from "expo-router"
import { View, Text, FlatList, Button, Alert } from "react-native"
import { listarVentas } from "../../servicios/ventas.services.js"

export default function Ventas() {
  const [ventas, setVentas] = useState([])

  useFocusEffect(
    useCallback(() => {
      cargarVentas()
    }, [])
  )

  async function cargarVentas() {
    try {
      const datos = await listarVentas()
      setVentas(datos)
        
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las ventas")
    }
  }

  return (
    <View style={{ padding: 110 }}>
      <Text>Listado de ventas</Text>

      <FlatList
        data={ventas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>Venta: {item.id}</Text>
            <Text>Producto ID: {item.productoId}</Text>
            <Text>Cantidad: {item.cantidad}</Text>
            <Text>Precio unitario: {item.precioUnitario}</Text>
            <Text>Total: {item.total}</Text>
            <Text>Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>
            <Text>Estado: {item.estado}</Text>

                <Button title="Mis ventas" onPress={() => router.push("/ventas/misVentas")} />
                
          </View>
        )}
      />

      <Button
        title="Registrar venta" onPress={() => router.push("/ventas/crear")} />

      <Button title="Mis ventas" onPress={() => router.push("/ventas/misVentas")} />
    </View>
  );
}
