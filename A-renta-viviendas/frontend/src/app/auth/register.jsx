import { router } from "expo-router"
import { useState } from "react"
import { View, Text, TextInput, Button,Alert,StyleSheet } from "react-native"
import { registrarUsuario } from "../../servicios/authServices.js"
 

export default function RegistroUsuario() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState("")
  
  async function handleRegistro() {
    await registrarUsuario({
      nombre,email,password,rol:rol.toLowerCase().trim() || "cliente"
    })

    Alert.alert("registro correctamente","continue para logearse",[{text:"continuar",onPress:() => router.push("/auth/login")}])
  }


  return (
    <View style={style.container}>
      <Text>Registro de usuarios</Text>

      <Text>Nombre</Text>
      <TextInput
        placeholder="digite su nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text>Email</Text>
      <TextInput
        placeholder="digite su email"
        value={email}
        onChangeText={setEmail}
      />

      <Text>Password</Text>
      <TextInput
        placeholder="digite su password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text>Elija su rol</Text>

      <Button title="O cliente" onPress={() => setRol("cliente")} />
      <Button title="O propietario" onPress={() => setRol("propietario")} />

      <Text>Rol seleccionado: {rol || "Ninguno"}</Text>

      <Button title="registrar" onPress={handleRegistro} />
    </View>
  );
}



const style = StyleSheet.create({
  container: {
   padding:100
  },
});