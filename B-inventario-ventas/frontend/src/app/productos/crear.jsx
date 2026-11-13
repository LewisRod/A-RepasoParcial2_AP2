import { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { router } from "expo-router"
import { crearProducto } from "../../servicios/productos.services.js"

export default function CrearProducto() {
  const [nombre, setNombre] = useState("")
  const [categoria, setCategoria] = useState("")
  const [precio, setPrecio] = useState(0)
  const [stock, setStock] = useState(0)
  const [disponible, setDisponible] = useState(true)




  async function handleCrear() {
    try {
      await crearProducto({
        nombre, categoria, precio: Number(precio), stock: Number(stock),disponible
      })

    Alert.alert("Correcto", "Producto creado correctamente", [{ text: "Continuar", onPress: () => router.replace("/productos") }])
        
    } catch (error) {
      Alert.alert("Error",  "No se pudo crear el producto" )
    }
  }

    
  
  return (
    <View style={{ padding: 110 }}>
      <Text>Crear producto</Text>

      <Text>Nombre</Text>
      <TextInput
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text>Categoria</Text>
      <TextInput
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text>Precio</Text>
      <TextInput
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Text>Stock</Text>
      <TextInput
        placeholder="Cantidad disponible"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />

      <Text>Disponibilidad: {disponible ? "Disponible" : "No disponible"}</Text>

      <Button title="Disponible" onPress={() => setDisponible(true)} />
      <Button title="No disponible" onPress={() => setDisponible(false)} />

      <Button title="Crear producto" onPress={handleCrear} />
    </View>
  );
}
