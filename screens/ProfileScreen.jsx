import { Text, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { setIsAuthenticated, setUsuarioNombre } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-customColor1-light">
      <Text>Profile Screen</Text>
      <View>
        <Text
          style={{ color: "blue", marginTop: 10, fontSize: 13 }}
          className="text-center"
          onPress={() => {
            setIsAuthenticated(false);
            setUsuarioNombre(null);
            navigation.navigate("Login");
          }}
        >
          Cerrar Sesion ?
        </Text>
      </View>
    </View>
  );
}
