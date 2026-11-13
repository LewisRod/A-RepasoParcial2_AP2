import { View, Text, TextInput, Alert, Button } from 'react-native'
import { router } from "expo-router"
import { useState } from 'react'
import{registrarUsuario} from "../../servicios/auth.services.js"

export default function register() {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rol, setRol] = useState("")
    

    async function handleRegistro() {
        try {
            await registrarUsuario({
                nombre,email,password,rol:rol || "cliente"
            })

            Alert.alert("usuario creado", "continue logueandose", [{ text: "continuar", onPress: () => router.replace("/auth/login") }])
            
        } catch (error) {
            console.log(error.response.data.mensaje)
        }
    }


  return (
    <View style={{ padding: 110 }}>
      <Text>register</Text>

      <Text>Nombre</Text>
      <TextInput
        placeholder="digite su nombre..."
        value={nombre}
        onChangeText={setNombre}
      />

      <Text>Email</Text>
      <TextInput
        placeholder="digite su email..."
        value={email}
        onChangeText={setEmail}
      />

      <Text>Contrasena</Text>
      <TextInput
        placeholder="digite su contrasena..."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text>rol elegido {rol}</Text>

      <Button title="Cliente" onPress={() => setRol("cliente")} />
      <Button title="Admin" onPress={() => setRol("admin")} />
      <Button title="Entrenador" onPress={() => setRol("entrenador")} />

      <Button title="Registrar" onPress={handleRegistro} />
    </View>
  );
}