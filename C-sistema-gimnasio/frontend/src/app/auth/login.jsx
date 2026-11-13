import { router } from "expo-router"
import { View, Text, Alert, TextInput, Button } from 'react-native'
import { guardarToken } from "../../servicios/auth.storage.js"
import { login } from "../../servicios/auth.services.js"
import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState("")
    const[password,setPassword] = useState("")

    async function handleLogin() {
       try {
         const datos = await login({
           email,
           password,
         });

         await guardarToken(datos);

         Alert.alert("Login exitoso", "Bienvenido", [
           { text: "continuar", onPress: () => router.replace("/plan") },
         ])
       } catch (error) {
        console.log(error.response.data.mensaje)
       }
    }


  return (
    <View style={{ padding: 110 }}>
      <Text>login</Text>

      <Text>Email</Text>
      <TextInput
        placeholder="ingrese su correo..."
        value={email}
        onChangeText={setEmail}
      />

      <Text>Contrasena</Text>
      <TextInput
        placeholder="ingrese su contrasena..."
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="iniciar sesion"
        onPress={handleLogin}
      />
      <Button
        title="ir a registro"
        onPress={() => router.replace("/auth/register")}
      />
    </View>
  );
}