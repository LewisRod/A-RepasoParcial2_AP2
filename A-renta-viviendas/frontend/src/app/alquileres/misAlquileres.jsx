import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { View, Text, FlatList, Alert, StyleSheet } from "react-native";
import { misAlquileres } from "../../servicios/alquileresServices.js";

export default function MisAlquileres() {
  const [alquileres, setAlquileres] = useState([]);

  useFocusEffect(
    useCallback(() => {
      cargarAlquileres()
    }, [])
  )

  async function cargarAlquileres() {
      const datos = await misAlquileres();
      setAlquileres(datos);
  }

  return (
    <View style={styles.container}>
      <Text>Mis alquileres</Text>

      <FlatList
        data={alquileres}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No tienes alquileres registrados.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Alquiler #{item.id}</Text>
            <Text>Vivienda: {item.viviendaId}</Text>
            <Text>Fecha de inicio: {item.fechaInicio}</Text>
            <Text>Fecha de finalización: {item.fechaFin}</Text>
            <Text>Estado: {item.estado}</Text>
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
  },
});
