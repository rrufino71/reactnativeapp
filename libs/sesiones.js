import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadData(key) {
  let data = null;
  try {
    const storedData = await AsyncStorage.getItem(key);
    if (storedData !== null) {
      const data = JSON.parse(storedData); // Convertir de vuelta a objeto
      //   console.log("Datos recuperados:", data);
      //   console.log("id:", data.id);
      //   console.log("name:", data.name);
      //   console.log("mail:", data.email);
      //   console.log("cumple:", data.cumple);
      //   console.log("telefono:", data.telefono);
      //   console.log("token:", data.token);
      return data;
    }
  } catch (error) {
    console.error("Error leyendo datos: ", error);
  }
}

export async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    //console.log("Data saved successfully!");
    return true;
  } catch (error) {
    console.error("Error saving data: ", error);
    return false;
  }
}

export async function removeData(key) {
  try {
    //await AsyncStorage.removeItem("userName");
    if (key) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.clear();
    }
    console.log("Data removed successfully");
    return true;
  } catch (error) {
    console.error("Error removing data: ", error);
    return false;
  }
}
