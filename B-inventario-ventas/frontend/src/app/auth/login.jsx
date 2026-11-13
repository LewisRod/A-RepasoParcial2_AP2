import { router } from "expo-router"
import { useState } from "react"
import { View, Text, TextInput, Button, Alert,StyleSheet } from "react-native"
import { login } from "../../servicios/auth.services.js"
import{guardarToken} from "../../servicios/storageService.js"


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    

    async function handleLogin() {
        const respuesta = await login({
            email,password
        })

        await guardarToken(respuesta.token)

        Alert.alert("Login exitoso","continue para gestionar el inventario",[{text:"continuar",onPress:() => router.push("/productos")}])
    }

    return (
        <View style={style.container}>
            <Text>Inicio de sesion</Text>

            <Text>Email</Text>
            <TextInput placeholder="ingrese su correo..." value={email} onChangeText={setEmail} />

            <Text>Contrasena</Text>
            <TextInput placeholder="ingrese su contrsena" value={password} onChangeText={setPassword} />

            <Button title="Continuar" onPress={handleLogin}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        padding:100
    }
})