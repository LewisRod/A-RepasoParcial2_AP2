import { router } from "expo-router"
import { useState } from "react"
import { View, Text, TextInput, Alert,Button,StyleSheet} from "react-native"
import { registrarUsuario } from "../../servicios/auth.services.js"



export default function RegistroUsuario() {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rol, setRol] = useState("")
    

    async function handleRegistro() {
        await registrarUsuario({
            nombre,email,password,rol:rol.toLowerCase().trim() || "empleado"
        })

        Alert.alert("registro exitoso","continue logueando su cuenta",[{text:"continuar",onPress:() => router.push("/auth/login")}])
    }


    return (
      <View style={style.container}>
        <Text>Registrate</Text>

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

        <Text> Elegir rol</Text>

        <Text>Rol elegido: {rol}</Text>

        <Button title="O empleado" onPress={() => setRol("empleado")} />
        <Button title="O administrador" onPress={() => setRol("admin")} />

        <Button title="Registrar" onPress={handleRegistro} />
      </View>
    );
}


const style = StyleSheet.create({
  container: {
    padding:100
  }
})