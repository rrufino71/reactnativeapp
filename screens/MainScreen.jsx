import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotificationArea } from "../components/NotificationArea";
import { AuthContext } from "../contexts/AuthContext";
import { fetchUserData } from "../libs/sesiones";
import Biometrics from "../components/Biometrics";

export default function MainScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const { mensaje, setUsuario, setIsAuthenticated, colorScheme } =
    useContext(AuthContext);
  const [dataSession, setDataSession] = useState(null);

  useEffect(() => {
    async function tomaDatos() {
      //console.log("Tomando datos de usuario");
      const session = await fetchUserData("usuario"); // Reemplaza 'userData' con la clave que guardaste
      if (session) {
        //console.log("Datos del usuario:", session);
        setDataSession(session);
      }
    }
    tomaDatos();
  }, []);

  useEffect(() => {
    if (dataSession) {
      setUsuario(dataSession);
      setIsAuthenticated(true);
    } else {
      setUsuario(null);
      setIsAuthenticated(false);
    }
  }, [dataSession]);

  return (
    <View
      style={{
        paddingTop: insets.top, // Aplica el margen superior
        paddingBottom: insets.bottom, // Aplica el margen inferior
        paddingLeft: insets.left, // Aplica el margen izquierdo
        paddingRight: insets.right, // Aplica el margen derecho
        //backgroundColor: "rgba(175, 176, 227, 0.3)",
      }}
      className={`flex-1 justify-center items-center ${colorScheme}`}
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
      <Text
        style={{ color: "blue", marginTop: 20 }}
        onPress={() => {
          fetchUserData("usuario");
        }}
      >
        Load Data
      </Text>
      <Biometrics />

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
