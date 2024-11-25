import { useContext } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotificationArea } from "../components/NotificationArea";
import { AuthContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const { mensaje } = useContext(AuthContext);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("usuario");
      if (storedData !== null) {
        const data = JSON.parse(storedData); // Convertir de vuelta a objeto
        //console.log("Datos recuperados:", data);
        console.log("id:", data.id);
        console.log("name:", data.name);
        console.log("mail:", data.email);
        console.log("cumple:", data.cumple);
        console.log("telefono:", data.telefono);
        console.log("token:", data.token);
      } else {
        console.log("Sin datos para mostrar");
      }
    } catch (error) {
      console.error("Error leyendo datos: ", error);
    }
  };

  return (
    <View
      style={{
        paddingTop: insets.top, // Aplica el margen superior
        paddingBottom: insets.bottom, // Aplica el margen inferior
        paddingLeft: insets.left, // Aplica el margen izquierdo
        paddingRight: insets.right, // Aplica el margen derecho
        //backgroundColor: "rgba(175, 176, 227, 0.3)",
      }}
      className="flex-1 justify-center items-center bg-customColor1-light"
    >
      <Button title="Go to About" onPress={() => navigation.replace("About")} />
      {/* Texto que también navega a DetailsScreen */}
      <Text
        style={{ color: "blue", marginTop: 20 }}
        onPress={() => navigation.navigate("About")}
      >
        About
      </Text>
      <Text
        style={{ color: "blue", marginTop: 20 }}
        onPress={() => navigation.navigate("Contacto")}
      >
        Contacto
      </Text>
      <Text style={{ color: "blue", marginTop: 20 }} onPress={loadData}>
        Load Data
      </Text>

      {mensaje && <NotificationArea notificacion={mensaje}></NotificationArea>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
