import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window"); // Obtener ancho de la pantalla

export default function BorderMenu() {
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
    <View style={styles.container}>
      {/* Icono del menú */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

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

      {/* Contenido principal */}
      <Text style={styles.mainContent}>
        ¡Contenido principal de la pantalla!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    top: 0,
    left: 0,
  },
  menuButton: {
    position: "absolute",
    top: 0,
    left: 0, // Ícono a la izquierda de la pantalla
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    zIndex: 10, // Asegura que el botón esté por encima del contenido
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
    backgroundColor: "white",
    elevation: 5, // Sombra en Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Sombra en iOS
    shadowOpacity: 0.8,
    shadowRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 20, // Espacio interno
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
  mainContent: {
    marginTop: 150,
    textAlign: "center",
    fontSize: 16,
  },
});
