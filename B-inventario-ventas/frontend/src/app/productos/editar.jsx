import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert,StyleSheet } from "react-native"
import { router,useLocalSearchParams } from "expo-router"
import { buscarProducto, actualizarProducto } from "../../servicios/productos.services.js";



export default function Editar() {
    const { id } = useLocalSearchParams()
    const [nombre, setNombre] = useState("")
    const [categoria, setCategoria] = useState("")
    const [precio, setPrecio] = useState("")
    const [stock, setStock] = useState("")
    const [disponible, setDisponible] = useState(true)
    
    useEffect(() => {
        async function cargarProducto() {
            const producto = await buscarProducto(id)

            setNombre(producto.nombre)
            setCategoria(producto.categoria)
            setPrecio(producto.precio)
            setStock(producto.stock)
            setDisponible(producto.disponible)
        }

        cargarProducto()
    }, [id])
    

    async function handleActualizar() {
        const datos = {
            nombre,categoria,precio:Number(precio),stock:Number(stock),disponible
        }

        await actualizarProducto(id, datos)
        
        Alert.alert("actualizado correctamente","producto actualizado",[{text:"continuar",onPress:() => router.back("/productos")}])   
    }

    return (
      <View style={style.container}>
        <Text>Actualiza tu producto</Text>

        <Text>Nombre del producto</Text>
        <TextInput value={nombre} onChangeText={setNombre} />

        <Text>Categoria</Text>
        <TextInput value={categoria} onChangeText={setCategoria} />

        <Text>Precio</Text>
        <TextInput value={precio} onChangeText={setPrecio} />

        <Text>Stock disponible</Text>
        <TextInput value={stock} onChangeText={setStock} />

        <Text>Eliga disponibilidad</Text>
        <Text>
          Disponibilidad: {disponible ? "Disponible" : "No disponible"}
        </Text>

        <Button title="O disponible" onPress={() => setDisponible(true)} />
        <Button title="O no disponible" onPress={() => setDisponible(false)} />

        <Button title="Actualizar producto" onPress={handleActualizar} />
      </View>
    );
}

const style = StyleSheet.create({
    container: {
        padding:100
    }
})