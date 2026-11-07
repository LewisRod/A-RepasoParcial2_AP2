import AsyncStorage from "@react-native-async-storage/async-storage"


const TOKEN_KEY = "token"

export const guardarToken = async (token) => {
    await AsyncStorage.setItem(TOKEN_KEY,token)
}

export const obtenerToken = async (token) => {
    await AsyncStorage.getItem(TOKEN_KEY)
}

export const eliminarToken = async (token) => {
    await AsyncStorage.removeItem(TOKEN_KEY)
}