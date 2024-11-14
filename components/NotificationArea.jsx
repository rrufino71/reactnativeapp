import { View, Text } from "react-native";

export function NotificationArea({ notificacion }) {
  return notificacion ? (
    <View
      className="items-center justify-center"
      style={{
        height: 70,
        padding: 5,
        position: "absolute",
        bottom: 0, // Al final de la pantalla
        left: 0,
        right: 0,
        //backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semi-transparente
        backgroundColor: "rgba(245, 124, 124, 0.8)",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 55,
      }}
    >
      <Text className="text-white">{notificacion}</Text>
    </View>
  ) : (
    <></>
  );
}
