import { useState, useCallback } from "react"
import { View, Text, FlatList, Alert } from "react-native"
import { useFocusEffect } from "expo-router"
import { misVentas } from "../../servicios/ventas.services.js"




export default function MisVentas() {
  const [ventas, setVentas] = useState([])

  useFocusEffect(
    useCallback(() => {
      cargarVentas()
    }, [])
  )


  async function cargarVentas() {
    try {
      const datos = await misVentas()
      setVentas(datos)
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar tus ventas")
    }
  }

    
  return (
    <View style={{ padding: 20 }}>
      <Text>Mis ventas</Text>

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
            <Text>Estado: {item.estado}</Text>
            <Text>Fecha: {new Date(item.fecha).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  )
}
