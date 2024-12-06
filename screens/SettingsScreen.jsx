import { Text, View, Button } from "react-native";
import {
  getSecureData,
  storeSecureData,
  deleteSecureData,
} from "../libs/secureStorage.js";

export default function SettingsScreen() {
  return (
    <View className="justify-center">
      <Text>Settings Screen</Text>
      <Button
        title="Graba Usuario"
        onPress={async () => {
          storeSecureData("user", "rrufino71@gmail.com");
          storeSecureData("pass", "12345678");
        }}
      />

      <Button
        style={{ margin: 10 }}
        title="Obtener Usuario"
        onPress={async () => {
          const xuser = await getSecureData("user");
          const xpass = await getSecureData("pass");
          console.log("user obtenido: ", xuser);
          console.log("pass obtenida: ", xpass);
        }}
      />

      <Button
        style={{ margin: 10 }}
        title="Borrar Usuario"
        onPress={async () => {
          deleteSecureData("user");
          deleteSecureData("pass");
        }}
      />
    </View>
  );
}
