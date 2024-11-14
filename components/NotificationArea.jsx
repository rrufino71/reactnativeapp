import { useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export function NotificationArea({ notificacion }) {
  const { tipoMensaje } = useContext(AuthContext);

  return notificacion ? (
    <View style={tipoMensaje == 1 ? styles.error : styles.info}>
      <Text className="text-white">{notificacion}</Text>
    </View>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  error: {
    height: 70,
    padding: 5,
    position: "absolute",
    bottom: 0, // Al final de la pantalla
    left: 0,
    right: 0,
    backgroundColor: "rgba(245, 124, 124, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 55,
  },

  info: {
    height: 70,
    padding: 5,
    position: "absolute",
    bottom: 0, // Al final de la pantalla
    left: 0,
    right: 0,
    backgroundColor: "rgba(2, 177, 66 , 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 55,
  },
});
