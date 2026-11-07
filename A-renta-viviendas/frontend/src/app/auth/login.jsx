import { router } from "expo-router"
import { View, Text, TextInput, Button, Alert } from "react-native"
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

        Alert.alert("Login exitoso",[{text:"aceptar",onPress:() => router.push("/viviendas")}])
    }


    return (
        <View>
            <Text>iniciar sesion</Text>

            <Text>Email</Text>
            <TextInput placeholder="digita tu correo" value={email} onChangeText={setEmail} />
            
            <Text>Contrasena</Text>
            <TextInput placeholder="digita tu password" value={password} onChangeText={setPassword} secureTextEntry/>
            
            <Button title="Login" onPress={handleLogin}/>
        </View>
    )


}