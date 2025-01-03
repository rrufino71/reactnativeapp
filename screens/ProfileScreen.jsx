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
  Pressable,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useForm } from "../hooks/useForm";
import { MAIL_VALIDATION, PASS_VALIDATION } from "../services/config";
import { updateUser } from "../libs/auth";
import { NotificationArea } from "../components/NotificationArea";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { removeUserData, saveUserData } from "../libs/sesiones";
import Biometrics from "../components/Biometrics";

export default function ProfileScreen() {
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

  let initialData = {
    name: "",
    email: "",
    telefono: "",
    cumple: "",
    errors: {},
  };

  useEffect(() => {
    const datos = () => {
      try {
        initialData = {
          name: usuario.name,
          email: usuario.email,
          telefono: usuario.telefono,
          cumple: usuario.cumple,
          errors: {},
        };
        setForm({
          name: usuario.name,
          email: usuario.email,
          telefono: usuario.telefono,
          cumple: usuario.cumple,
        });
        saveUserData("usuario", usuario);
        //console.log("usuario guardado");
      } catch (error) {
        console.error("Error en la autenticación:", error);
        setMensaje("Error al conectar con el servidor.");
        setIsAuthenticated(false);
      }
    };
    if (usuario) {
      datos();
    }
  }, [usuario]);

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
    if (!form.telefono.trim() && !isError) {
      //errors.email = "El E-mail es obligatorio";
      setTipoMensaje(1);
      setMensaje("El telefono es obligatorio");
      isError = true;
    }

    setErrors(errors);
    return isError ? errors : null;
  };
  const {
    form,
    setForm,
    errors,
    loading,
    setLoading,
    setErrors,
    handleChange,
  } = useForm(initialData, onValidate);

  const navigation = useNavigation();

  const [response, setResponse] = useState(null);
  const [ocultaPass, setOcultaPass] = useState(true);

  const onSubmit = async () => {
    let validation = false;
    validation = onValidate(form);
    const { name, email, telefono, cumple } = form;
    if (!validation) {
      const result = await updateUser({
        id: usuario.id,
        name: name,
        email: email,
        telefono: telefono,
        cumple: cumple,
        argentino: 1,
        notifica: 1,
        token: usuario.token,
      });

      //console.log('result:', result)

      setResponse(result);

      //alert(result.status)
      if (result.status) {
        setTipoMensaje(2);
        setMensaje(result.message);
        setUsuario({
          ...usuario,
          name: name,
          email: email,
          telefono: telefono,
          cumple: cumple,
        });
        //navigation.replace("Login");
      } else {
        //Alert.alert(`Bienvenido ${result.message}, logueo fail`);
        //console.log("error:", result.message);
        setTipoMensaje(1);
        setMensaje(result.message);
      }
    }
  };

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(() => new Date()); // Fecha inicial basada en el formulario

  const handleConfirm = (event, selectedDate) => {
    setShowPicker(false); // Ocultar el picker
    if (selectedDate) {
      const localDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      );
      const formattedDate = localDate.toISOString().split("T")[0];
      setForm({ ...form, cumple: formattedDate }); // Actualiza el hook form
      setDate(formattedDate);
    }
  };

  useEffect(() => {
    if (showPicker) {
      const cumpleDate = new Date(form.cumple + "T00:00:00");

      const localDate = new Date(
        cumpleDate.getFullYear(),
        cumpleDate.getMonth(),
        cumpleDate.getDate()
      );

      // console.log("localDate", localDate.toISOString().split("T")[0]);

      // const localDate_zone = new Date(
      //   localDate.getTime() - localDate.getTimezoneOffset() * 60000
      // );
      const localDate_zone = new Date(localDate);

      // console.log("localDate_zone", localDate_zone.toISOString().split("T")[0]);

      setDate(new Date(localDate_zone));
      //      console.log("date:", date);
    } else {
      setDate(new Date());
    }
  }, [showPicker]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 130} // Ajusta según la altura del header o barra superior
      >
        <ScrollView
          // className={`flex-1 justify-center items-center ${
          //   usuario ? "bg-" + usuario.colorScheme + "-back" : ""
          // }`}
          className="bg-customColor1-back"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
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
                paddingTop: 20,
              }}
              className="flex-1 justify-center items-center  text-customColor1-title"
            >
              Perfil
            </Text>
          </View>
          <View>
            <Text style={styles.label} className="text-customColor1-labels">
              Nombre
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              className="text-customColor1-inputs"
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
            <Text style={styles.label} className="text-customColor1-labels">
              Correo Electronico
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              className="text-customColor1-inputs"
              label="e-mail"
              keyboardType="emailAddress"
              placeholder="E-Mail"
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
            ></TextInput>
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </View>
          <View>
            <Text style={styles.label} className="text-customColor1-labels">
              Telefono
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              className="text-customColor1-inputs"
              style={styles.input}
              label="Telefono"
              keyboardType="number-pad"
              placeholder="Telefono"
              value={form.telefono}
              onChangeText={(value) => handleChange("telefono", value)}
            ></TextInput>
            {errors.telefono && (
              <Text style={styles.error}>{errors.telefono}</Text>
            )}
          </View>

          <View>
            <Text style={styles.label} className="text-customColor1-labels">
              Fecha Cumpleaños
            </Text>
          </View>
          <Pressable onPress={() => setShowPicker(true)}>
            <View pointerEvents="none" style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                className="text-customColor1-inputs"
                //value={date.toISOString().split("T")[0]} // Formato yyyy-mm-dd
                value={form.cumple}
                placeholder="Seleccionar fecha"
                editable={false} // Hace que el usuario no pueda escribir directamente
              />
            </View>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default" // Cambia a "spinner" o "calendar" según el diseño que prefieras
              onChange={handleConfirm}
            />
          )}

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
              title="Grabar"
              onPress={onSubmit}
              style={{ borderBottomEndRadius: 10 }}
            />
          </View>

          <View>
            <Text
              style={{ color: "blue", marginTop: 10, fontSize: 13 }}
              className="text-center"
              onPress={() => {
                setIsAuthenticated(false);
                setUsuarioNombre(null);
                removeUserData();
                navigation.navigate("Home");
              }}
            >
              Cerrar Sesion ?
            </Text>
          </View>

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
    margin: 5,
  },
  input: {
    flex: 1, // Ocupa todo el espacio restante
    fontSize: 16,
    paddingVertical: 5,
    borderWidth: 0, // Sin bordes
    borderColor: "transparent", // Elimina el color del borde
    outlineStyle: "none", // Desactiva el estilo en foco (solo para ciertas plataformas)
    backgroundColor: "transparent", // Evita cambios de color al enfocar
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
    width: 400,
  },
});
