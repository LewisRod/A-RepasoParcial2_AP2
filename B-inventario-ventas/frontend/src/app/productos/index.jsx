import { useState, useCallback } from "react"
import { router, useFocusEffect } from "expo-router"
import { View, Text, FlatList, Button, Alert } from "react-native"
import { listarProductos, eliminarProducto } from "../../servicios/productos.services.js"

export default function Productos() {
  const [productos, setProductos] = useState([])


  
  useFocusEffect(
    useCallback(() => {
      cargarProductos()
    }, [])
  )


  async function cargarProductos() {
    try {
      const datos = await listarProductos()
      setProductos(datos)

    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los productos")
    }
  }



  async function handleEliminar(id) {
    try {
      await eliminarProducto(id)
      Alert.alert("Correcto", "Producto eliminado")
      cargarProductos()

    } catch (error) {
      Alert.alert( "Error", "No se pudo eliminar" )
    }
  }




  return (
    <View style={{ padding: 110 }}>
      <Text>Inventario de productos</Text>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Categoria: {item.categoria}</Text>
            <Text>Precio: {item.precio}</Text>
            <Text>Stock: {item.stock}</Text>
            <Text>Disponible: {item.disponible ? "Si" : "No"}</Text>

            <Button title="Actualizar" onPress={() => router.push(`/productos/editar?id=${item.id}`)} />

            <Button title="Eliminar" onPress={() => handleEliminar(item.id)} />
          </View>
        )}
      />

      <Button title="Crear producto" onPress={() => router.push("/productos/crear")} />
      <Button title=" ir a ventas" onPress={() => router.replace("/ventas")}/>
    </View>
  );
}
