import React, { useEffect, useState, useContext } from "react";
import { Alert, Button, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { getSecureData, storeSecureData } from "../libs/secureStorage.js";
import { getLogin } from "../libs/auth.js";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import { saveUserData } from "../libs/sesiones";

export default function Biometrics() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [huellaOk, setHuellaOk] = useState(false);
  const [storedUser, setStoredUser] = useState("");
  const [storedPass, setStoredPass] = useState("");
  const {
    isAuthenticated,
    mensaje,
    setMensaje,
    setIsAuthenticated,
    usuarioNombre,
    setUsuarioNombre,
    tipoMensaje,
    setTipoMensaje,
    usuario,
    setUsuario,
  } = useContext(AuthContext);
  const navigation = useNavigation();

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
      setHuellaOk(true);
    } else {
      Alert.alert("Error", "La autenticación falló.");
      setHuellaOk(false);
    }
  };

  useEffect(() => {
    const logueo = async () => {
      if (huellaOk) {
        console.log("huellaOk true:", huellaOk);
        const xstoredUser = await getSecureData("user");
        const xstoredPass = await getSecureData("pass");

        if (xstoredUser && xstoredPass) {
          setStoredUser(xstoredUser);
          setStoredPass(xstoredPass);
        } else {
          console.log("No se encontraron datos almacenados");
        }
      }
    };

    logueo();
  }, [huellaOk]);

  useEffect(() => {
    const login = async () => {
      try {
        console.log("Intentando autenticar con biometría");
        const resultado = await getLogin({
          email: storedUser,
          password: storedPass,
        });

        if (resultado?.status) {
          const datosUsuario = {
            ...resultado.data,
            token: resultado.token,
            mensaje: resultado.mensaje,
            colorScheme: "customColor1", //agregar a la api
          };
          setUsuario(datosUsuario);
          setTipoMensaje(2);
          setMensaje(resultado.message);
          await saveUserData("usuario", datosUsuario); // Asegúrate de que sea await si es async
          setIsAuthenticated(true);
          navigation.replace("Home");
        } else {
          setTipoMensaje(1);
          setMensaje(resultado.message);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error en la autenticación:", error);
        setMensaje("Error al conectar con el servidor.");
        setIsAuthenticated(false);
      }
    };

    if (huellaOk && storedUser && storedPass) {
      login();
    }
  }, [storedUser, storedPass, huellaOk]);

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
