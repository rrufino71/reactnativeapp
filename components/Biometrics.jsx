import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

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
      Alert.alert("Éxito", "Autenticación completada.");
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
