import * as LocalAuthentication from "expo-local-authentication";
import { Alert, Button, View } from "react-native";

export default function Biometrics() {
  const authenticate = async () => {
    const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
    if (!isBiometricSupported) {
      Alert.alert(
        "Error",
        "La autenticación biométrica no está soportada en este dispositivo."
      );
      console.log(
        "La autenticación biométrica no está soportada en este dispositivo."
      );
      return;
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      Alert.alert(
        "Error",
        "No hay datos biométricos registrados en este dispositivo."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autenticación requerida",
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
      <Button title="Autenticarse con huella" onPress={authenticate} />
    </View>
  );
}
