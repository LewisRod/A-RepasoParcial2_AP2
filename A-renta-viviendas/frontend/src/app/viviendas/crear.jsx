import { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { router } from "expo-router"
import { crearVivienda } from "../../servicios/viviendaServices.js"

export default function CrearVivienda() {

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precioMensual, setPrecioMensual] = useState("");
  const [habitaciones, setHabitaciones] = useState("");

  const handleCrear = async () => {

      const datos = {
        titulo,
        descripcion,
        direccion,
        precioMensual: Number(precioMensual),
        habitaciones: Number(habitaciones),
      };

      await crearVivienda(datos)

      Alert.alert("Vivienda creada correctamente", [
        {text: "Aceptar", onPress: () => router.replace("/viviendas")}
      ])
  }
    

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 10 }}>
      <Text>Crear vivienda</Text>

      <Text>Titulo</Text>
      <TextInput
        placeholder="Título de la vivienda"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text>Descripción</Text>
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text>Dirección</Text>
      <TextInput
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <Text>Precio mensual</Text>
      <TextInput
        placeholder="Precio mensual"
        value={precioMensual}
        onChangeText={setPrecioMensual}
      />

      <Text>Habitaciones</Text>
      <TextInput
        placeholder="Cantidad de habitaciones"
        value={habitaciones}
        onChangeText={setHabitaciones}
      />

      <Button title="Crear vivienda" onPress={handleCrear} />
    </View>
  );
}
