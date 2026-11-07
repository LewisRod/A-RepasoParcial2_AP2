import { router } from "expo-router"
import { View, Text, Button } from "react-native"

export default function () {
  return (
    <View>
      <Text>Sistema de viviendas</Text>

      <Button title="registro" onPress={() => router.push("/auth/register")} />
      <Button title="login" onPress={() => router.push("/auth/login")}/>
    </View>
  );
}