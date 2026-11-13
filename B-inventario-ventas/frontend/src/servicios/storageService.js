import AsyncStorage from "@react-native-async-storage/async-storage"

const TOKEN_KEY = "token"

export async function guardarToken(token) {
    await AsyncStorage.setItem(TOKEN_KEY, token)
}

export async function obtenerToken() {
    return await AsyncStorage.getItem(TOKEN_KEY)
}

export async function eliminarToken() {
    await AsyncStorage.removeItem(TOKEN_KEY)
}