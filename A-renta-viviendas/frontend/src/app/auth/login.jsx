import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native"
import { iniciarSesion } from "../../servicios/authServices.js";
import { guardarToken } from "../../servicios/authStorage.js"
import {router} from "expo-router"



export default function Login() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    
    const handleLogin = async () => {

        const respuesta = await iniciarSesion({ email, password })

        await guardarToken(respuesta.token)

        Alert.alert("sesion iniciada correctamente", [
          { text: "Aceptar",onPress: () => router.push("/viviendas")}
        ])
    }

    return (
        <View>
            <Text>Iniciar sesion</Text>

            <Text>Correo</Text>
            <TextInput
                placeholder="ingrese su correo electronico"
                value={email}
                onChangeText={setEmail}
            />

            <Text>Contrasena</Text>
            <TextInput
                placeholder="ingrese su contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="iniciar sesion" onPress={handleLogin}/>

        </View>
    )
}