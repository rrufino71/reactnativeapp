import { View, StyleSheet, Button, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MainScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top, // Aplica el margen superior
          paddingBottom: insets.bottom, // Aplica el margen inferior
          paddingLeft: insets.left, // Aplica el margen izquierdo
          paddingRight: insets.right, // Aplica el margen derecho
        },
      ]}
      className="bg-blue-400"
    >
      <Button title="Go to About" onPress={() => navigation.replace("About")} />
      {/* Texto que también navega a DetailsScreen */}
      <Text
        style={{ color: "blue", marginTop: 20 }}
        onPress={() => navigation.navigate("About")}
      >
        About
      </Text>
      <Text
        style={{ color: "blue", marginTop: 20 }}
        onPress={() => navigation.navigate("Contacto")}
      >
        Contacto
      </Text>
      {/* <Text
        style={{ color: "blue", marginTop: 20 }}
        onPress={() => navigation.navigate("Login")}
      >
        Login
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
