import { router } from "expo-router"
import { useState } from "react"
import { View, Button, Text, TextInput,Alert,StyleSheet} from "react-native"
import { guardarToken } from "../../servicios/authStorage.js"
import{iniciarSesion} from "../../servicios/authServices.js"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  async function handleLogin() {
   try {
     const respuesta = await iniciarSesion({
       email,
       password,
     });
     await guardarToken(respuesta.token);

     Alert.alert(
       "Login exitoso",
       "Continua para gestionar viviendas y alquileres",
       [{ text: "continuar", onPress: () => router.replace("/viviendas") }],
     )
   } catch (error) {
    Alert.alert("Error ","error con las credenciales")
   }
  }


  return (
    <View style={style.container}>
      <Text>Login</Text>

      <Text>Email</Text>
      <TextInput placeholder="digite su correo..." value={email} onChangeText={setEmail} />

      <Text>Password</Text>
      <TextInput placeholder="digite su password" value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="iniciar sesion" onPress={handleLogin}/>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding:100
  }
})