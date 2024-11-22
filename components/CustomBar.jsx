import React, { useState, useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Importa el hook de navegación
import { HomeIcon, ProfileIcon, SettingsIcon, SignInIcon } from "./Icons.jsx";
import { AuthContext } from "../contexts/AuthContext";

export default function CustomTabBar({ isKeyboardVisible }) {
  const navigation = useNavigation(); // Obtén la función de navegación
  const {
    isAuthenticated,
    mensaje,
    setMensaje,
    usuarioNombre,
    setIsAuthenticated,
    setUsuarioNombre,
  } = useContext(AuthContext);

  if (isKeyboardVisible) {
    return null; // No renderizar nada
  }

  return (
    // <View style={styles.tabContainer} className="bg-customColor5">
    <View
      style={[isKeyboardVisible && styles.hidden, styles.tabContainer]}
      className="bg-customColor5"
    >
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("Home")}
      >
        <HomeIcon />
        <Text style={styles.tabLabel}>Home</Text>
      </TouchableOpacity>

      {isAuthenticated && (
        <>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <SettingsIcon />
            <Text style={styles.tabLabel}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => {
              //setIsAuthenticated(false);
              //setUsuarioNombre(null);
              navigation.navigate("Profile");
            }}
          >
            <SignInIcon />
            <Text style={styles.tabLabel}>{usuarioNombre}</Text>
          </TouchableOpacity>
        </>
      )}

      {!isAuthenticated && (
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Login")}
        >
          <ProfileIcon />
          <Text style={styles.tabLabel}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    //backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingBottom: 5, // Padding para centrar los iconos verticalmente
    paddingTop: 5,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  hidden: {
    //display: "none", // Oculta el componente si el teclado está visible
    height: 0, // Oculta el componente
    overflow: "hidden", // Asegura que el contenido no se muestre
  },
});
