import { useState } from "react";
import { View, Text, TextInput, Button, Alert, Pressable } from "react-native";
import { router } from "expo-router"
import { registrarUsuario } from "../../servicios/authServices.js";


export default function RegistroUsuario(){
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rol, setRol] = useState("")
    
    const handleRegister = async () => {
        const respuesta = await registrarUsuario({
           nombre,email,password,rol: rol || "cliente" 
        })

        Alert.alert(
            "Registro exitosoTu cuenta se creó como ${respuesta.registro.rol}",
                [ {text: "Aceptar", onPress: () => router.push("/auth/login")}]
        )

    }

    return (
      <View>
        <Text>Crear cuenta</Text>

        <Text>Nombre</Text>
        <TextInput
          placeholder="ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text>Correo</Text>
        <TextInput
          placeholder="Ingrese su correo"
          value={email}
          onChangeText={setEmail}
        />

        <Text>Contraseña</Text>
        <TextInput
          placeholder="Ingrese su contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text>Elige tu rol</Text>

        <Pressable onPress={() => setRol("cliente")}>
          <Text>{rol === "cliente" ? "🔘 Cliente" : "◯ Cliente"}</Text>
        </Pressable>

        <Pressable onPress={() => setRol("propietario")}>
          <Text>
            {rol === "propietario" ? "🔘 Propietario" : "◯ Propietario"}
          </Text>
        </Pressable>

        <Text>Si no eliges un rol, se asignará cliente por defecto.</Text>

        <Button title="Registrarse" onPress={handleRegister} />

        <Button title="Ir a login" onPress={() => router.push("/auth/login")} />
      </View>
    );
}