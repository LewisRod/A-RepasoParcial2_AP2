import { router } from "expo-router"
import { View, Text, Button, StyleSheet } from "react-native"

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sistema de reserva viviendas</Text>
        <Text style={styles.subtitle}>Encuentra tu próximo hogar</Text>

        <View style={styles.actions}>
          <Button title="Registrarse" color="#2563eb" onPress={() => router.push("/auth/register")} />
          <Button title="Iniciar sesión" color="#475569" onPress={() => router.push("/auth/login")} />
        </View>
      </View>
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
  card: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    gap: 16,
    elevation: 3,
  },
  title: {
    color: "#1e3a8a",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
  },
  actions: {
    gap: 8,
  },
})