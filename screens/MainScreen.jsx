import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotificationArea } from "../components/NotificationArea";
import { AuthContext } from "../contexts/AuthContext";
import { fetchUserData } from "../libs/sesiones";
import { MenuIcon } from "../components/Icons";

const { width } = Dimensions.get("window"); // Obtener ancho de la pantalla

export default function MainScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const { mensaje, setUsuario, setIsAuthenticated, usuario, isAuthenticated } =
    useContext(AuthContext);
  const [dataSession, setDataSession] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function tomaDatos() {
      const xsession = await fetchUserData("usuario"); // Reemplaza 'userData' con la clave que guardaste
      console.log("Tomando datos de usuario: ", xsession);
      setSession(xsession);
    }
    tomaDatos();
  }, []);

  useEffect(() => {
    console.log("guardamos session: ", session);
    if (session) {
      setUsuario(session);
      setIsAuthenticated(true);
      setDataSession(session);
    }
  }, [session]);

  return (
    <View
      style={{
        paddingTop: insets.top, // Aplica el margen superior
        paddingBottom: insets.bottom, // Aplica el margen inferior
        backgroundColor: "rgba(0, 72, 142,0.5)",
      }}
      className={`flex-1 justify-center items-center bg-${
        usuario && usuario.colorScheme
      }-back`}
    >
      {/* Contenido superpuesto */}

      <BorderMenu navigation={navigation} />

      {mensaje && <NotificationArea notificacion={mensaje}></NotificationArea>}
    </View>

    // </ImageBackground>
  );
}

function BorderMenu({ navigation }) {
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
    <View
      style={[
        styles.containerMenu,
        //menuVisible ? { zIndex: 100 } : { zIndex: -1, height: 0, width: 0 },
      ]}
    >
      {/* Botón del menú - visible solo cuando el menú está cerrado */}
      {!menuVisible && (
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      )}

      {/* Menú deslizable */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX }], opacity }]}
      >
        <View style={styles.containerTitleView}>
          <Text style={styles.titleMenu}>Menu</Text>
        </View>
        <Text
          style={[styles.drawerText]}
          onPress={() => {
            navigation.navigate("Contacto");
            toggleMenu(); // Cierra el menú después de navegar
          }}
        >
          Contacto
        </Text>
        <View style={styles.divider} />
        <Text
          style={styles.drawerText}
          onPress={() => {
            navigation.navigate("About");
            toggleMenu(); // Cierra el menú después de navegar
          }}
        >
          About
        </Text>
        <View style={styles.divider} />
        <Text
          style={styles.drawerText}
          onPress={() => {
            fetchUserData("usuario");
            toggleMenu(); // Cierra el menú después de navegar
          }}
        >
          Load Data
        </Text>
        <View style={styles.divider} />
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.drawerText}>Cerrar</Text>
        </TouchableOpacity>
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
    zIndex: 100, // Asegura que el menú esté por encima de otros elementos
  },
  menuButton: {
    position: "absolute",
    top: 0,
    left: 0, // Ícono en la esquina superior izquierda
    padding: 10,
    borderRadius: 5,
    zIndex: 110, // Asegura que el botón esté encima del menú
  },
  menuText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width / 2,
    height: "100%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    zIndex: 105,
    backgroundColor: "rgba(110, 144, 231, 0.8)",
  },
  containerTitleView: {
    backgroundColor: "rgba(60, 108, 232, 0.6)",
    padding: 15,
    width: "100%",
  },
  titleMenu: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  drawerText: {
    fontSize: 18,
    marginVertical: 0,
    paddingHorizontal: 20,
    color: "#fff",
    paddingVertical: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#fff",
    marginVertical: 5,
    width: "100%",
    alignSelf: "center",
    marginBottom: 0,
    marginTop: 0,
  },
});
