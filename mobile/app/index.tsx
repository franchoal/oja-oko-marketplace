import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
        }}
      >
        Oja-Oko 🌿
      </Text>

      <Text
        style={{
          marginTop: 10,
          fontSize: 16,
        }}
      >
        Farm Fresh Marketplace
      </Text>
    </View>
  );
}