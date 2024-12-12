import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import {
  SettingsIcon,
  HomeIcon,
  InfoIcon,
  GroupsIcon,
} from "../components/Icons";

const { width } = Dimensions.get("window");

export default function MainScreen({ navigation }) {
  const { isAuthenticated, usuario } = useContext(AuthContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const translateX = useRef(new Animated.Value(-width * 0.75)).current; // Menú ocupa 75% del ancho
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20, // Detectar deslizamiento horizontal
      onPanResponderMove: (_, gestureState) => {
        if (!menuVisible && gestureState.dx > 0) {
          // Mostrar menú si está cerrado y desliza a la derecha
          translateX.setValue(Math.min(-width * 0.75 + gestureState.dx, 0));
        } else if (menuVisible && gestureState.dx < 0) {
          // Ocultar menú si está abierto y desliza a la izquierda
          translateX.setValue(Math.max(gestureState.dx, -width * 0.75));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          toggleMenu(true); // Abrir el menú
        } else if (gestureState.dx < -50) {
          toggleMenu(false); // Cerrar el menú
        } else {
          toggleMenu(menuVisible); // Volver al estado original
        }
      },
    })
  ).current;

  const toggleMenu = (show) => {
    Animated.timing(translateX, {
      toValue: show ? 0 : -width * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(show));
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Menú deslizable */}
      <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
        {!isAuthenticated ? (
          <Text style={styles.menuText}>Menú</Text>
        ) : (
          <Text
            style={[
              styles.menuText,
              {
                borderBottomWidth: 3,
                borderBottomColor: "white",
              },
            ]}
          >
            {usuario.name}
          </Text>
        )}
        {/* acerca*/}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <InfoIcon color="white" size={15} marginRight={8} />
          <TouchableOpacity
            onPress={() => {
              toggleMenu(false);
              navigation.navigate("About");
            }}
          >
            <Text style={styles.menuItem}>Acerca</Text>
          </TouchableOpacity>
        </View>

        {/* contactos */}
        {isAuthenticated && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <GroupsIcon color="white" size={15} marginRight={8} />
            <TouchableOpacity
              onPress={() => {
                toggleMenu(false);
                navigation.navigate("Contacto");
              }}
            >
              <Text style={styles.menuItem}>Contactos</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* settings*/}
        {isAuthenticated && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SettingsIcon color="white" size={15} marginRight={8} />
            <TouchableOpacity
              onPress={() => {
                toggleMenu(false);
                navigation.navigate("Settings");
              }}
            >
              <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <HomeIcon color="white" size={15} marginRight={8} />
          <TouchableOpacity
            onPress={() => {
              toggleMenu(false);
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Contenido principal */}
      <View style={styles.content}>
        {!menuVisible && (
          <TouchableOpacity
            onPress={() => toggleMenu(true)}
            style={styles.menuButton}
          >
            <Text style={styles.menuButtonText}>☰</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.contentText}>Contenido Principal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  menu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.75,
    height: "100%",
    backgroundColor: "#333",
    padding: 20,
    zIndex: 10,
  },
  menuText: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
  },
  menuItem: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 18,
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 20,
  },
  menuButtonText: {
    fontSize: 30,
  },
});
