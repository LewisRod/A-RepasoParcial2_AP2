import { router, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { View, Text,FlatList, Button, Alert,StyleSheet } from "react-native"
import { listarProductos } from "../../servicios/productos.services.js"


export default function Productos() {
    const[productos,setProductos] = useState([])

    useFocusEffect(
        useCallback(() => {
            cargarProductos()
        },[])
    )
    
    async function cargarProductos() {
        const datos = await listarProductos()
        setProductos(datos)
    }

    return (
      <View style={style.container}>
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nombre}</Text>
              <Text>Categoria: {item.categoria}</Text>
              <Text>Precio: {item.precio}</Text>
              <Text>Stock: {item.stock}</Text>
              <Text>Disponible: {item.disponible}</Text>
              <Button
                title="Actualizar"
                onPress={() => router.push(`/productos/editar?id=${item.id}}`)}
              />
            </View>
          )}
        />
        <Button
          title="crear producto"
          onPress={() => router.push("/productos/crear")}
        />
      </View>
    );
}

const style = StyleSheet.create({
    container: {
        padding:100
    }
})