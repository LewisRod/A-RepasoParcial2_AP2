import { useState, useEffect } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { buscarProducto, actualizarProducto } from "../../servicios/productos.services.js"

export default function EditarProducto() {
  const { id } = useLocalSearchParams()
  const [nombre, setNombre] = useState("")
  const [categoria, setCategoria] = useState("")
  const [precio, setPrecio] = useState(0)
  const [stock, setStock] = useState(0)
  const [disponible, setDisponible] = useState(true)

    
    
  useEffect(() => {
    async function cargarProducto() {
      try {
        const producto = await buscarProducto(id)

        setNombre(producto.nombre)
        setCategoria(producto.categoria)
        setPrecio(String(producto.precio))
        setStock(String(producto.stock))
        setDisponible(producto.disponible)
          
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar el producto")
      }
    }

    cargarProducto()
  }, [id])

    
    
    
  async function handleActualizar() {
    try {
      await actualizarProducto(id, {
        nombre,
        categoria,
        precio: Number(precio),
        stock: Number(stock),
        disponible,
      })

        Alert.alert("Correcto", "Producto actualizado", [{ text: "Continuar", onPress: () => router.replace("/productos") }])
        
    } catch (error) {
      Alert.alert( "Error", "No se pudo actualizar" )
    }
  }

    
    
    
  return (
    <View style={{ padding: 30 }}>
      <Text>Editar producto</Text>

      <Text>Nombre</Text>
      <TextInput value={nombre} onChangeText={setNombre} />

      <Text>Categoria</Text>
      <TextInput value={categoria} onChangeText={setCategoria} />

      <Text>Precio</Text>
      <TextInput
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Text>Stock</Text>
      <TextInput value={stock} onChangeText={setStock} keyboardType="numeric" />

      <Text>Disponibilidad: {disponible ? "Disponible" : "No disponible"}</Text>

      <Button title="Disponible" onPress={() => setDisponible(true)} />

      <Button title="No disponible" onPress={() => setDisponible(false)} />

      <Button title="Actualizar producto" onPress={handleActualizar} />
    </View>
  )
}
