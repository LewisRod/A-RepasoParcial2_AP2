import { useState } from "react"
import { router } from "expo-router"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { registrarUsuario } from "../../servicios/auth.services.js"

export default function Registro() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState("empleado")



  async function handleRegistro() {
    try {
      await registrarUsuario({ nombre, email, password, rol })

      Alert.alert("Registro exitoso", "Usuario creado correctamente", [{ text: "Continuar", onPress: () => router.replace("/auth/login") }])

    } catch (error) {
      Alert.alert( "Error", "No se pudo registrar" )
    }
  }





  return (
    <View style={{ padding: 100 }}>
      <Text>Registro de usuario</Text>

      <Text>Nombre</Text>
      <TextInput
        placeholder="Ingrese su nombre..."
        value={nombre}
        onChangeText={setNombre}
      />

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

      <Text>Seleccionar rol: {rol}</Text>

      <Button title="Empleado" onPress={() => setRol("empleado")} />
      <Button title="Administrador" onPress={() => setRol("admin")} />

      <Button title="Registrar" onPress={handleRegistro} />
    </View>
  );
}
