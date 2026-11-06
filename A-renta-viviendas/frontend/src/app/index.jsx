import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router"

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 10 }}>
      <Text>Sistema de renta de viviendas</Text>

      <Button
        title="Iniciar sesión"
        onPress={() => router.push("/auth/login")}
      />

      <Button
        title="Registrarse"
        onPress={() => router.push("/auth/register")}
      />
    </View>
  );
}
