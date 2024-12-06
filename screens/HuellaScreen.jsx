import { Text, View } from "react-native";
import Biometrics from "../components/Biometrics";

export default function HuellaScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-customColor1-light">
      <Biometrics />
    </View>
  );
}
