import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router"
import { actualizarVivienda, buscarVivienda} from "../../servicios/viviendaServices.js"
import { View, Text, TextInput, Button, Alert } from "react-native"


export default function Editar(){
  const { id } = useLocalSearchParams()
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [direccion, setDireccion] = useState("")
  const [precioMensual, setPrecioMensual] = useState("")
  const [habitaciones, setHabitaciones] = useState("")
  
  useEffect(() => {
    async function cargarVivienda() {
      const vivienda = await buscarVivienda(id)

      setTitulo(vivienda.titulo)
      setDescripcion(vivienda.descripcion)
      setDireccion(vivienda.direccion)
      setPrecioMensual(String(vivienda.precioMensual))
      setHabitaciones(String(vivienda.habitaciones))
    }
    cargarVivienda()
  }, [id])
  
  async function handleActualizar() {
    const datos = {
      titulo,descripcion,direccion,precioMensual:Number(precioMensual),habitaciones:Number(habitaciones)
    }

    await actualizarVivienda(id, datos)
    
    Alert.alert("vivienda acrualizada","continua para ver la actualizacion",[{text:"continuar",onPress:() => router.replace("/viviendas")}])
  }

  return (
     <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 10 }}>
      <Text>Editar vivienda</Text>

      <Text>Título</Text>
      <TextInput value={titulo} onChangeText={setTitulo} />

      <Text>Descripción</Text>
      <TextInput value={descripcion} onChangeText={setDescripcion} />

      <Text>Dirección</Text>
      <TextInput value={direccion} onChangeText={setDireccion} />

      <Text>Precio mensual</Text>
      <TextInput
        value={precioMensual}
        onChangeText={setPrecioMensual}
      />

      <Text>Habitaciones</Text>
      <TextInput
        value={habitaciones}
        onChangeText={setHabitaciones}
      />

      <Button title="Guardar cambios" onPress={handleActualizar} />
    </View>
  )
}
