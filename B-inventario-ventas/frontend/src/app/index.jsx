import { router } from "expo-router"
import { View, Text, Button,StyleSheet} from "react-native"



export default function Index() {
    return (
        <View style={style.container}>
            <Text>Bienvenido al sistema de inventario y ventas, registrese</Text>

            <Button title="registrarse" onPress={() => router.push("/auth/registro")} />
            <Button title="login" onPress={() => router.push("/auth/login")}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        padding:100
    }
})