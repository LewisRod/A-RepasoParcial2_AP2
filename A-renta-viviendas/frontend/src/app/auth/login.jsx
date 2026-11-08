import { router } from "expo-router"
import { View, Button, Text, TextInput,Alert } from "react-native"
import { iniciarSesion } from "../../servicios/authServices.js"
import { guardarToken } from "../../servicios/authStorage.js"
import { useState } from "react"


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    

    async function handleLogin() {
        const respuesta = await iniciarSesion({
            email,password
        })

        await guardarToken(respuesta.token)

        Alert.alert("logeado correctamente",[{text:"continuar",onPress: () => router.push("/viviendas")}])
    }


    return (
      <View>
            <Text>Login</Text>
            
        <Text>Email</Text>
        <TextInput
          placeholder="digite su correo..."
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="digite su contrasena..."
          value={password}
          onChangeText={setPassword}
        />

        <Button title="iniciar sesion" onPress={handleLogin} />
      </View>
    );
}