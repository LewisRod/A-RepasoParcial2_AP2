import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import {listarAlquileres, cambiarEstadoAlquiler } from "../../servicios/alquileresServices.js";

export default function Alquileres() {
  const [alquileres, setAlquileres] = useState([]);

  useFocusEffect(
    useCallback(() => {
      cargarAlquileres()
    }, [])
  )

  async function cargarAlquileres() {
      const datos = await listarAlquileres();
      setAlquileres(datos);
  }

  async function handleCambiarEstado(id, estado) {

      await cambiarEstadoAlquiler(id, { estado })

      Alert.alert("Solicitud actualizada", `Estado: ${estado}`);
      
      cargarAlquileres();
  }

  return (
    <View style={styles.container}>
      <Text>Solicitudes de alquiler</Text>

      <FlatList
        data={alquileres}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No hay solicitudes registradas.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Alquiler #{item.id}</Text>
            <Text>Vivienda: {item.viviendaId}</Text>
            <Text>Cliente: {item.usuarioId}</Text>
            <Text>Inicio: {item.fechaInicio}</Text>
            <Text>Finalización: {item.fechaFin}</Text>
            <Text>Estado: {item.estado}</Text>

            {item.estado === "pendiente" && (
              <>
                <Button
                  title="Aceptar"
                  onPress={() => handleCambiarEstado(item.id, "aceptado")}
                />

                <Button
                  title="Rechazar"
                  color="red"
                  onPress={() => handleCambiarEstado(item.id, "rechazado")}
                />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    gap: 5,
  },
});
