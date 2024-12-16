import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window"); // Obtener el ancho de la pantalla

export default function CustomStatusBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.statusBarContainer, { paddingTop: insets.top }]}>
      <StatusBar style="dark" backgroundColor="white" />

      <View style={styles.barContent}>
        {/* <Image
          source={require("../logo.png")}
          style={[styles.logo, { width: width / 4 }]}
          resizeMode="contain"
        /> */}

        <Text style={styles.titleText}>Clever FOX</Text>

        <View style={{ width: width / 4 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    height: 130, // Ajusta la altura según tus necesidades
    backgroundColor: "white", // Color de fondo para la barra
    borderBottomWidth: 1, // Línea debajo de la barra (opcional)
    borderBottomColor: "#ddd", // Color de la línea
  },
  barContent: {
    flexDirection: "row",
    //alignItems: "right",
    //justifyContent: "space-between", // Distribuir los elementos en la barra
    //width: "100%", // Para que ocupe todo el ancho de la pantalla
    paddingHorizontal: 10, // Espaciado horizontal para los elementos
    paddingTop: 20,
  },
  logo: {
    height: 60, // Tamaño del logo
  },
  titleText: {
    fontSize: 30, // Tamaño del texto
    fontWeight: "bold", // Fuente en negrita
    color: "black", // Color del texto
    textAlign: "left", // Asegura que el texto esté centrado
    flex: 1, // Permite que el texto se expanda y se quede en el centro
  },
});
