import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

import { listarProductosDisponibles } from "../../servicios/productos.services.js";
import { crearVenta } from "../../servicios/ventas.services.js";

export default function CrearVenta() {
  const [productos, setProductos] = useState([]);
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await listarProductosDisponibles();
        setProductos(respuesta);

        if (respuesta.length > 0) {
          setProductoId(respuesta[0].id.toString());
        }
      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
        Alert.alert("Error", "No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  const productoSeleccionado = productos.find(
    (producto) => producto.id.toString() === productoId,
  );

  const precioUnitario = productoSeleccionado?.precio || 0;
  const total = Number(cantidad) * precioUnitario;

  async function handleCrearVenta() {
    if (!productoId || !cantidad.trim()) {
      return Alert.alert(
        "Error",
        "Selecciona un producto e indica la cantidad",
      );
    }

    const cantidadNumerica = Number(cantidad);

    if (!Number.isInteger(cantidadNumerica) || cantidadNumerica <= 0) {
      return Alert.alert(
        "Error",
        "La cantidad debe ser un entero mayor que cero",
      );
    }

    if (cantidadNumerica > productoSeleccionado.stock) {
      return Alert.alert("Error", "No hay suficiente stock disponible");
    }

    try {
      setGuardando(true);

      await crearVenta({
        productoId: productoId,
        cantidad: cantidadNumerica,
      });

      Alert.alert("Venta registrada", "La venta se registró correctamente", [
        {
          text: "Continuar",
          onPress: () => router.replace("/ventas"),
        },
      ]);
    } catch (error) {
      console.log("ERROR AL REGISTRAR:", error.response?.data || error.message);

      Alert.alert(
        "Error",
        error.response?.data?.mensaje || "No se pudo registrar la venta",
      );
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrar venta</Text>

      {productos.length === 0 ? (
        <Text>No hay productos disponibles para vender.</Text>
      ) : (
        <>
          <Text>Selecciona un producto</Text>

          <View style={styles.pickerContainer}>
            <Picker selectedValue={productoId} onValueChange={setProductoId}>
              {productos.map((producto) => (
                <Picker.Item
                  key={producto.id}
                  label={`${producto.nombre} - Stock: ${producto.stock}`}
                  value={producto.id.toString()}
                />
              ))}
            </Picker>
          </View>

          <Text>Cantidad</Text>

          <TextInput
            style={styles.input}
            placeholder="Introduce la cantidad"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <Text>Precio unitario: RD$ {precioUnitario}</Text>

          <Text>Stock disponible: {productoSeleccionado?.stock || 0}</Text>

          <Text style={styles.total}>
            Total estimado: RD$ {total.toFixed(2)}
          </Text>

          <Button
            title={guardando ? "Registrando..." : "Registrar venta"}
            onPress={handleCrearVenta}
            disabled={guardando}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },

  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
