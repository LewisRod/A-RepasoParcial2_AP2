import { router } from "expo-router"
import { useState, useEffect } from "react"
import { View, Button, FlatList, Text } from "react-native"
import { listarViviendas } from "../../servicios/viviendaServices"


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
    <View>
      <FlatList
        data={viviendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.titulo}</Text>
            <Text>Direccion: {item.direccion}</Text>
            <Text>Precio mensual {item.precioMensual}</Text>
            <Text>Habitaciones: {item.habitaciones}</Text>
            <Text>
              Disponivilidad: {item.disponible ? "disponible" : "ocupada"}
            </Text>
          </View>
        )}
      />

      <Button title="crear vivienda" onPress={() => router.push("/viviendas/crear")}/>
    </View>
  );
}