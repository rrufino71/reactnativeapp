import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotificationArea } from "../components/NotificationArea";
import { AuthContext } from "../contexts/AuthContext";
import { fetchUserData } from "../libs/sesiones";
import Biometrics from "../components/Biometrics";
const { width } = Dimensions.get("window"); // Obtener ancho de la pantalla

export default function MainScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const { mensaje, setUsuario, setIsAuthenticated, usuario } =
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
        //paddingLeft: insets.left, // Aplica el margen izquierdo
        //paddingRight: insets.right, // Aplica el margen derecho
        //backgroundColor: "rgba(175, 176, 227, 0.3)",
      }}
      className={`flex-1 justify-center items-center bg-${
        usuario && usuario.colorScheme
      }-back`}
    >
      <BorderMenu />

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

function BorderMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const translateX = useState(new Animated.Value(-width / 2))[0]; // Inicia fuera de la vista
  const opacity = useState(new Animated.Value(0))[0]; // Inicia completamente invisible

  const toggleMenu = () => {
    if (!menuVisible) {
      // Mostrar el menú
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0, // Mover dentro de la vista
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1, // Hacerlo visible
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Ocultar el menú
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -width / 2, // Mover fuera de la vista
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0, // Hacerlo invisible
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.containerMenu}>
      {/* Icono del menú - visible solo cuando el menú está cerrado */}
      {!menuVisible && (
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      )}

      {/* Menú deslizable */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX }], opacity }]}
      >
        <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.drawerText}>Opción 1</Text>
        <Text style={styles.drawerText}>Opción 2</Text>
        <Text style={styles.drawerText}>Opción 3</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 100, // Asegura que todo esté encima de otros elementos
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 10, // Ícono a la izquierda de la pantalla
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    zIndex: 110, // El botón está por encima incluso del menú
  },
  menuText: {
    color: "white",
    fontSize: 18,
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0, // Mantener el menú alineado con la parte superior
    width: width / 2, // Menú ocupa la mitad del ancho de la pantalla
    height: "100%", // Ocupa todo el alto
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco con opacidad del 80%
    elevation: 10, // Sombra en Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Sombra en iOS
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 20, // Espacio interno
    zIndex: 105, // Garantiza que esté encima del contenido principal
  },
  closeButton: {
    alignSelf: "flex-end", // Botón de cierre en la esquina superior derecha del menú
  },
  closeText: {
    fontSize: 18,
  },
  drawerText: {
    fontSize: 18,
    marginVertical: 10,
  },
});
