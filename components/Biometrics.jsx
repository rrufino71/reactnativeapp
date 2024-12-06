import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { getSecureData, storeSecureData } from "../libs/secureStorage.js";

export default function Biometrics() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      // Verificar si el hardware soporta biometría
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []); // Array vacío para que se ejecute una sola vez

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      Alert.alert(
        "Error",
        "No hay datos biométricos registrados en este dispositivo."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Confirme su identidad",
      fallbackLabel: "Usar contraseña",
    });

    if (result.success) {
      //Alert.alert("Éxito", "Autenticación completada.");

      const storedUser = await getSecureData("user");
      const storedPass = await getSecureData("pass");
      console.log("storeUser:", storedUser);
      const result = await getLogin({
        email: storedUser,
        password: storedPass,
      });
      setResponse(result);
      if (result.status) {
        console.log("result:", result);
        const datosUsuario = {
          ...result.data,
          token: result.token,
          mensaje: result.mensaje,
          colorScheme: "customColor1", //agregar a la api
        };
        setUsuario(datosUsuario);
        setTipoMensaje(2);
        setMensaje(result.message);
        setIsAuthenticated(true);
        saveUserData("usuario", datosUsuario);
        storeSecureData("user", form.email);
        storeSecureData("pass", form.password);
        navigation.replace("Home");
      } else {
        //Alert.alert(`Bienvenido ${result.message}, logueo fail`);
        //console.log("error:", result.message);
        setTipoMensaje(1);
        setMensaje(result.message);
      }
    } else {
      Alert.alert("Error", "La autenticación falló.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        {isBiometricSupported
          ? "El dispositivo admite biometría."
          : "El dispositivo no admite biometría."}
      </Text>
      {isBiometricSupported && (
        <Button
          title="Autenticarse con biometría"
          onPress={handleBiometricAuth}
        />
      )}
    </View>
  );
}
