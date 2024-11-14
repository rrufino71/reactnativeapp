import { Text, TextInput, View, StyleSheet, Button, Alert } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useForm } from "../hooks/useForm";
import { MAIL_VALIDATION, PASS_VALIDATION } from "../services/config";
import { getLogin } from "../libs/auth";
import { NotificationArea } from "../components/NotificationArea";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const initialData = {
    email: "rrufino71@gmail.com",
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

    if (!form.email.trim()) {
      //errors.email = "El E-mail es obligatorio";
      setTipoMensaje(1);
      setMensaje("El E-mail es obligatorio");
      isError = true;
    } else if (!regxCorreo.test(form.email)) {
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

  const {
    isAuthenticated,
    mensaje,
    setMensaje,
    setIsAuthenticated,
    usuarioNombre,
    setUsuarioNombre,
    tipoMensaje,
    setTipoMensaje,
  } = useContext(AuthContext);

  const onSubmit = async () => {
    let validation = false;
    validation = onValidate(form);
    const { email, password } = form;
    if (!validation) {
      const result = await getLogin({ email: email, password: password });
      setResponse(result);
      if (result.status) {
        //Alert.alert(`Bienvenido ${result.message.name}, logueo exitoso`);
        //console.log("ok:", result.message.name);
        setTipoMensaje(2);
        setMensaje(result.message.name);
        setIsAuthenticated(true);
        setUsuarioNombre(result.message.name);
        navigation.replace("Home");
      } else {
        //Alert.alert(`Bienvenido ${result.message}, logueo fail`);
        //console.log("error:", result.message);
        setTipoMensaje(1);
        setMensaje(result.message);
      }
    }
  };

  return (
    <>
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
          Login
        </Text>
      </View>

      <View style={{ padding: 5 }}>
        <Text style={{ margin: 10, color: "grey" }}>Correo Electronico</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            marginBottom: 5,
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: "white",
            borderColor: "grey",
          }}
          label="e-mail"
          keyboardType="emailAddress"
          placeholder="E-Mail"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
        ></TextInput>
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>
      <View style={{ padding: 5 }}>
        <Text style={{ margin: 10, color: "grey" }}>Password</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            marginBottom: 0,
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: "white",
            borderColor: "grey",
          }}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      <View
        style={{
          height: 50,
          justifyContent: "left",
          borderBlockColor: "grey",
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{ color: "blue", marginTop: 20 }}
          onPress={() => navigation.navigate("Register")}
        >
          Tenes cuenta ?
        </Text>
      </View>
      <View
        style={{
          height: 100,
          justifyContent: "center",
          height: 100,
          marginTop: 10,
          paddingTop: 30,
          paddingHorizontal: 60,
          borderBlockColor: "grey",
        }}
      >
        <Button
          title="Login"
          onPress={onSubmit}
          style={{ borderBottomEndRadius: 10 }}
        />
      </View>
      {/* {response && (
          <Text style={styles.error}>
            Respuesta: {JSON.stringify(response)}
          </Text>
        )} */}
      <NotificationArea notificacion={mensaje}></NotificationArea>
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
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 12,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
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
});
