import { useState } from "react"
import { router } from "expo-router"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { login } from "../../servicios/auth.services.js"
import { guardarToken } from "../../servicios/storageService.js"



export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  async function handleLogin() {
    try {
      const respuesta = await login({ email, password })

      await guardarToken(respuesta.token)

    Alert.alert("Login exitoso", "Bienvenido", [{ text: "Continuar", onPress: () => router.replace("/productos") }])
        
    } catch (error) {
      Alert.alert( "Error", error.response?.data?.mensaje || "No se pudo iniciar sesion" )
    }
  }



  return (
    <View style={{ padding: 100 }}>
      <Text>Inicio de sesion</Text>

      <Text>Email</Text>
      <TextInput
        placeholder="Ingrese su correo..."
        value={email}
        onChangeText={setEmail}
      />

      <Text>Contraseña</Text>
      <TextInput
        placeholder="Ingrese su contraseña..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => router.push("/auth/registro")} />
          
    </View>
  );
}
