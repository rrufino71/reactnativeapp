import * as SecureStore from "expo-secure-store";

export async function storeSecureData(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
    //console.log("Dato almacenado de manera segura");
  } catch (error) {
    console.log("Error al almacenar el dato", error);
  }
}

export async function getSecureData(key) {
  try {
    const data = await SecureStore.getItemAsync(key);
    if (data) {
      //console.log("Data recuperada:", data);
      return data;
    } else {
      console.log("No se encontró el dato");
    }
  } catch (error) {
    console.log("Error al recuperar el dato", error);
  }
}

export async function deleteSecureData(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    //console.log("dato eliminado");
  } catch (error) {
    console.log("Error al eliminar el dato", error);
  }
}
