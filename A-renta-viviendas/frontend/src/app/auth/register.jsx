import { router } from "expo-router"
import { useState } from "react"
import { View, Button, Text, Alert, TextInput } from "react-native"
import{registrarUsuario} from "../../servicios/authServices.js"


export default function RegistroUsuario() {
  const [nombre, setNombre] = useState("")
  const[email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState("")

  

  async function handleRegistro() {
    await registrarUsuario({
      nombre,email,password,rol:rol.toLowerCase() || "cliente"
    })

    Alert.alert("Registro exitoso",[{text:"aceptar",onPress:() => router.push("/auth/login")}])
  }

  return (
    <View>
      <Text>Registro de usuario</Text>

      <Text>Nombre</Text>
      <TextInput placeholder="digita tu nombre..." value={nombre} onChangeText={setNombre} />

      <Text>Email</Text>
      <TextInput placeholder="digita tu correo" value={email} onChangeText={setEmail} />

      <Text>Contrasena</Text>
      <TextInput placeholder="digita tu contrasena" value={password} onChangeText={setPassword} secureTextEntry />


      <Text>Rol (cliente o propietario)</Text>
      <TextInput placeholder="Ingrese su rol (opcional)" value={rol} onChangeText={setRol} />

      <Button title="registrarse" onPress={() => router.push("/auth/login")}/>
    </View>
  );
}