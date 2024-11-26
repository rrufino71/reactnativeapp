import AsyncStorage from "@react-native-async-storage/async-storage";

async function loadData(key) {
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

async function saveData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    //console.log("Data saved successfully!");
    return true;
  } catch (error) {
    console.error("Error saving data: ", error);
    return false;
  }
}

async function removeData(key) {
  try {
    //await AsyncStorage.removeItem("userName");
    if (key) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.clear();
    }
    return true;
  } catch (error) {
    console.error("Error removing data: ", error);
    return false;
  }
}

export async function fetchUserData(key) {
  const session = await loadData(key); // Reemplaza 'userData' con la clave que guardaste
  if (session) {
    console.log("Datos del usuario:", session);
    return session;
  } else {
    console.log("No se encontraron datos.");
    return null;
  }
}

export async function saveUserData(key, value) {
  const session = await saveData(key, value); // Reemplaza 'userData' con la clave que guardaste
  if (session) {
    console.log("Datos del usuario guardados.");
  } else {
    console.log("No se guardaron datos.");
  }
}

export async function removeUserData(key) {
  const session = await removeData(key); // Reemplaza 'userData' con la clave que guardaste
  if (session) {
    console.log("Datos eliminados.");
  } else {
    console.log("No se eliminaron datos.");
  }
}
