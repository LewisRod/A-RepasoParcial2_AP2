import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { alquilarVivienda } from "../../servicios/alquileresServices.js";

export default function Solicitar() {
  const { viviendaId } = useLocalSearchParams()
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

  async function handleSolicitar() {

      await alquilarVivienda({
        viviendaId: Number(viviendaId),
        fechaInicio,
        fechaFin,
      });

      Alert.alert("Solicitud enviada", "Tu solicitud de alquiler fue registrada correctamente",
        [{text: "Continuar",onPress: () => router.replace("/alquileres/misAlquileres")}]
      )
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 10 }}>
      <Text>Solicitar alquiler</Text>

      <Text>Vivienda ID: {viviendaId}</Text>

      <Text>Fecha de inicio</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={fechaInicio}
        onChangeText={setFechaInicio}
      />

      <Text>Fecha de finalización</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={fechaFin}
        onChangeText={setFechaFin}
      />

      <Button title="Solicitar alquiler" onPress={handleSolicitar} />
      <Button title="Ir a mis alquileres" onPress={() => router.push("/alquileres/misAlquileres")}/>
    </View>
  );
}
