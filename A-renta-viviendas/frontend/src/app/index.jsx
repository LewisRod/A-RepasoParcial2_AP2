import { View, Text,Button,StyleSheet } from 'react-native'
import{router} from "expo-router"

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>Sistema de viviendas</Text>

        <Button
          title="registro"
          onPress={() => router.push("/auth/register")}
        />
        <Button title="login" onPress={() => router.push("/auth/login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8c99b0",
    padding: 20,
  },
  card: {
    backgroundColor: "#977f97",
    borderRadius: 10,
    padding: 100,
    gap: 10,
  },
})
