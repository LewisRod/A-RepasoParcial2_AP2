import { router, useFocusEffect } from "expo-router";
import { FlatList, View, Text, Button,StyleSheet} from "react-native"
import { useState,useCallback} from "react"
import { listarViviendas } from "../../servicios/viviendaServices.js"

export default function Viviendas() {
  const [viviendas, setViviendas] = useState([])
  

  async function cargarViviendas() {
    try {
      
      const datos = await listarViviendas()
      setViviendas(datos)
      
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar las viviendas");
    }
  }
  
  useFocusEffect(
    useCallback(() => {
      cargarViviendas();
    }, [])
  )

  return (
    <View style={style.container}>
      <Text>VIVIENDAS</Text>

      <FlatList
        data={viviendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Text>Descripcion: {item.descripcion}</Text>
            <Text>Direccion: {item.direccion}</Text>
            <Text>Precio mensual: {item.precioMensual}</Text>
            <Text>Habitaciones: {item.habitaciones}</Text>
          </View>
        )}
      />

      <Button title="crear vivienda" onPress={() => router.push("/viviendas/crear")}/>
    </View>
  )

}

const style = StyleSheet.create({
  container: {
    padding:100
  }
})