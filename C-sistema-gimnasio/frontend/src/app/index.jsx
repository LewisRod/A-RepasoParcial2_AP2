import { router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Index() {
  return (
    <View style={{ padding: 110 }}>
      <Text>Sistema de gimnasio y membresia</Text>

      <Button title="registro" onPress={() => router.push("/auth/register")} />
      <Button title="login" onPress={() => router.push("/auth/login")} />
    </View>
  );
}
