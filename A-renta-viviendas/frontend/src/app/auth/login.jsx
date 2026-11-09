import { router } from "expo-router"
import { View, Button, Text, TextInput,Alert,StyleSheet } from "react-native"
import { iniciarSesion } from "../../servicios/authServices.js"
import { guardarToken } from "../../servicios/authStorage.js"
import { useState } from "react"


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

          Alert.alert("Inicio de sesión exitoso","Bienvenido", [
            { text: "continuar", onPress: () => router.replace("/viviendas") }]);
      } catch (error) { 
              console.log( "ERROR LOGIN:",error.response?.data || error.message)
      }
    }


    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#eff6ff",
  },
});
