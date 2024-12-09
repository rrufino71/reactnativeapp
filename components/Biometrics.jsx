import React, { useEffect, useState, useContext } from "react";
import { Alert, Button, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { getSecureData, storeSecureData } from "../libs/secureStorage.js";
import { getLogin } from "../libs/auth.js";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";

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
    if (huellaOk) {
      console.log("huellaok true:", huellaOk);
      let result = null;
      const logueo = async () => {
        const xstoredUser = await getSecureData("user");
        const xstoredPass = await getSecureData("pass");
        setStoredUser(xstoredUser);
        setStoredPass(xstoredPass);
        console.log("storeUser:", xstoredUser);
        console.log("storePass:", xstoredPass);
      };
      logueo();
    } else {
      console.log("huellaok false:", huellaOk);
    }
  }, [huellaOk]);

  useEffect(() => {
    if (storedPass != "" || storedPass != "") {
      const login = async () => {
        console.log("vamos a hacer la peticion del token");
        const resultado = await getLogin({
          email: storedUser,
          password: storedPass,
        });
        if (resultado.status) {
          const datosUsuario = {
            ...resultado.data,
            token: resultado.token,
            mensaje: resultado.mensaje,
            colorScheme: "customColor1", //agregar a la api
          };
          setUsuario(datosUsuario);
          setTipoMensaje(2);
          setMensaje(resultado.message);
          setIsAuthenticated(true);
          saveUserData("usuario", datosUsuario);
          navigation.replace("Home");
        } else {
          setTipoMensaje(1);
          setMensaje(resultado.message);
        }
      };
      login();
    }
  }, [storedUser, storedPass]);

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
