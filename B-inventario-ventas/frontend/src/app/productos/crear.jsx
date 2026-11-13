import { useState } from "react";
import { View, Text, TextInput, Alert, Button,StyleSheet } from "react-native"
import { crearProducto } from "../../servicios/productos.services.js"
import {router} from "expo-router"


export default function Crear() {
    const [nombre, setNombre] = useState("")
    const [categoria, setCategoria] = useState("")
    const [precio, setPrecio] = useState("")
    const [stock, setStock] = useState("")
    const [disponible, setDisponible] = useState(true)
    

    async function handleCrear() {
       const precioNumerico = Number(precio)
       const stockNumerico = Number(stock)

       if (
         !nombre.trim() ||
         !categoria.trim() ||
         !precio.trim() ||
         !stock.trim() ||
         !Number.isInteger(precioNumerico) ||
         precioNumerico <= 0 ||
         !Number.isInteger(stockNumerico) ||
         stockNumerico < 0
       ) {
         Alert.alert(
           "Datos inválidos",
           "Ingresa nombre, categoría, un precio entero mayor que cero y un stock entero igual o mayor que cero."
         )
         return
       }

       try {
         await crearProducto({
           nombre: nombre.trim(),
           categoria: categoria.trim(),
           precio: precioNumerico,
           stock: stockNumerico,
           disponible,
         });

         Alert.alert("producto creado", "Producto creado correctamente", [
           { text: "continuar", onPress: () => router.replace("/productos") },
         ]);
           
         setNombre("")
         setCategoria("")
         setPrecio("")
         setStock("")
         setDisponible(true)
           
       } catch (error) {
           const mensaje =
             error.response?.data?.mensaje ||
             (error.response?.status === 401
               ? "Inicia sesión para crear un producto."
               : error.message || "No fue posible crear el producto.")
           Alert.alert("Error al crear el producto", mensaje)
       }
        
    }

    return (
        <View style={style.container}>
            <Text>Crea tus producto</Text>

            <Text>Nombre del producto</Text>
            <TextInput placeholder="digite el nombre del producto..." value={nombre} onChangeText={setNombre} />

            <Text>Categoria</Text>
            <TextInput placeholder="digite su categoria..." value={categoria} onChangeText={setCategoria} />

            <Text>Precio</Text>
            <TextInput placeholder="digite el precio del producto" value={precio} onChangeText={setPrecio} />

            <Text>Stock</Text>
            <TextInput placeholder="digite la cantidad disponible" value={stock} onChangeText={setStock} />

            <Text>Eliga disponibilidad</Text>
            <Text>Diponiblidad: {disponible ? "Disponible": "no disponible"}</Text>

            <Button title="O disponible" onPress={() => setDisponible(true)} />
            <Button title="O no disponible" onPress={() => setDisponible(false)} />
            
            <Button title="Agregar producto" onPress={handleCrear}/>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        padding:100
    }
})