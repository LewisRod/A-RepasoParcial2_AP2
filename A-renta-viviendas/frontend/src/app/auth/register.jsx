import { router } from "expo-router"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { useState } from "react"
import { registrarUsuario } from "../../servicios/authServices.js"


export default function RegistrarUsuario(){
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassoword] = useState("")
  const [rol, setRol] = useState("")
  

  async function handleRegistro() {
    await registrarUsuario({
      nombre,email,password,rol:rol || "cliente"
    })

    Alert.alert("usuario registrado correctamente",[{text:"aceptar",onPress: () => router.push("/auth/login")}])
  }


  return (
    <View>
      <Text>Registroo</Text>

      <Text>Nombre</Text>
      <TextInput placeholder="digite su nombre..." value={nombre} onChangeText={setNombre} />
      
      <Text>Email</Text>
      <TextInput placeholder="digite su email..." value={email} onChangeText={setEmail} />

      <Text>Contrasena</Text>
      <TextInput placeholder="digite  su contrasena..." value={password} onChangeText={setPassoword} secureTextEntry/>

      <Text>Rol (cliente o propietario)</Text>
      <TextInput placeholder=" digite su rol (campo opcional)" value={rol} onChangeText={setRol} />
      
      <Button title="registrarse" onPress={handleRegistro}/>
    </View>
  )
}
