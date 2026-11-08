import { router } from "expo-router"
import { View, Text, Button } from "react-native"

export default function Index() {
  return (
    <View>
      <Text>Sistema de reserva viviendas</Text>
      <Text>Login</Text>

      <Button title="registrarse" onPress={() => router.push("/auth/register")} />
      <Button title="iniciar sesion" onPress={() => router.push("/auth/login")}/>
    </View>
  )
}