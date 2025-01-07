import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export async function storeSecureData(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
    //Alert.alert("Dato almacenado de manera segura");
  } catch (error) {
    //Alert.alert("Error al almacenar el dato", error);
  }
}

export async function getSecureData(key) {
  try {
    const data = await SecureStore.getItemAsync(key);
    if (data) {
      //Alert.alert("Data recuperada:", data);
      return data;
    } else {
      //Alert.alert("No se encontró el dato");
    }
  } catch (error) {
    Alert.alert("Error al recuperar el dato", error);
  }
}

export async function deleteSecureData(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    //Alert.alert("dato eliminado");
  } catch (error) {
    Alert.alert("Error al eliminar el dato", error);
  }
}
