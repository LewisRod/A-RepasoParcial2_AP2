import { router } from "expo-router"
import { View, Text, Button,FlatList,StyleSheet} from "react-native"
import { listarViviendas } from "../../servicios/viviendaServices.js"
import { useState,useEffect } from "react"


export default function Viviendas() {
  const [viviendas, setViviendas] = useState([])
  
  async function cargarViviendas() {
    const datos = await listarViviendas()
    setViviendas(datos)
  }

  useEffect(() => {
    cargarViviendas()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>Lista de vivendas</Text>

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#eff6ff",
  },
});
