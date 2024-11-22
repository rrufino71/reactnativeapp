import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useForm } from "../hooks/useForm";
import { MAIL_VALIDATION, PASS_VALIDATION } from "../services/config";
import { registerUser } from "../libs/auth";
import { NotificationArea } from "../components/NotificationArea";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Visibility, VisibilityOff } from "../components/Icons";

export default function RegisterScreen() {
  const initialData = {
    name: "",
    email: "",
    password: "",
    errors: {},
  };

  const navigation = useNavigation();

  const { form, errors, loading, setLoading, setErrors, handleChange } =
    useForm(initialData, onValidate);

  const onValidate = (form) => {
    let isError = false;
    let errors = {};
    let regxCorreo = MAIL_VALIDATION;
    let regxPassword = PASS_VALIDATION;

    if (!form.name.trim()) {
      //errors.password = "La password no puede estar vacio";
      setTipoMensaje(1);
      setMensaje("El nombre no puede estar vacio");
      isError = true;
    }
    if (!form.email.trim() && !isError) {
      //errors.email = "El E-mail es obligatorio";
      setTipoMensaje(1);
      setMensaje("El E-mail es obligatorio");
      isError = true;
    } else if (!regxCorreo.test(form.email) && !isError) {
      //errors.email = "El E-mail no parece tener un formato valido";
      setTipoMensaje(1);
      setMensaje("El E-mail no parece tener un formato valido");
      isError = true;
    }
    if (!form.password.trim() && !isError) {
      //errors.password = "La password no puede estar vacio";
      setTipoMensaje(1);
      setMensaje("La password no puede estar vacia");
      isError = true;
    } else if (!regxPassword.test(form.password) && !isError) {
      //errors.password = "La password  debe tener entre 8 y 20 digitos";
      setTipoMensaje(1);
      setMensaje("La password  debe tener entre 8 y 20 digitos");
      isError = true;
    }

    setErrors(errors);
    return isError ? errors : null;
  };

  const [response, setResponse] = useState(null);
  const [ocultaPass, setOcultaPass] = useState(true);

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

  const onSubmit = async () => {
    let validation = false;
    validation = onValidate(form);
    const { name, email, password } = form;
    if (!validation) {
      const result = await registerUser({
        name: name,
        email: email,
        password: password,
      });

      setResponse(result);

      if (result.status) {
        setTipoMensaje(2);
        setMensaje(result.message);
        navigation.replace("Login");
      } else {
        //Alert.alert(`Bienvenido ${result.message}, logueo fail`);
        //console.log("error:", result.message);
        setTipoMensaje(1);
        setMensaje(result.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setOcultaPass(!ocultaPass);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 130} // Ajusta según la altura del header o barra superior
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              justifyContent: "center",
              height: 100,
              marginTop: 40,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 32,
              }}
            >
              Registro
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Nombre</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              label="Nombre"
              keyboardType="default"
              placeholder="Nombre"
              value={form.name}
              onChangeText={(value) => handleChange("name", value)}
            ></TextInput>
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          </View>

          <View>
            <Text style={styles.label}>Correo Electronico</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              label="e-mail"
              keyboardType="emailAddress"
              placeholder="E-Mail"
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
            ></TextInput>
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={ocultaPass}
              value={form.password}
              onChangeText={(value) => handleChange("password", value)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{ justifyContent: "center", width: 24 }}
            >
              {ocultaPass ? <Visibility /> : <VisibilityOff />}
            </TouchableOpacity>
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>
          <View
            style={{
              height: 50,
              justifyContent: "left",
              borderBlockColor: "grey",
              paddingHorizontal: 15,
            }}
          ></View>
          <View
            style={{
              height: 100,
              justifyContent: "center",
              height: 40,
              marginTop: 0,
              paddingTop: 0,
              paddingHorizontal: 60,
              borderBlockColor: "grey",
            }}
          >
            <Button
              title="Registro"
              onPress={onSubmit}
              style={{ borderBottomEndRadius: 10 }}
            />
          </View>
          {/* {response && (
          <Text style={styles.error}>
            Respuesta: {JSON.stringify(response)}
          </Text>
        )} */}

          {mensaje && (
            <NotificationArea notificacion={mensaje}></NotificationArea>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    margin: 20,
    color: "grey",
  },
  input: {
    flex: 1, // Ocupa todo el espacio restante
    fontSize: 16,
    paddingVertical: 0,
  },
  iconButton: {
    marginLeft: 10, // Espacio entre el ícono y el input
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    marginTop: 0,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
  },

  inputContainer: {
    flexDirection: "row", // Alinea ícono y TextInput
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50, // Fija el mismo alto para ambos contenedores
    backgroundColor: "white",
    marginHorizontal: 20,
  },
});
