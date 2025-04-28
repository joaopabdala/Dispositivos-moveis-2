import { Link, useRouter } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/(auth)/(home)");
  };

  const handleRegister = () => {
    console.log("registrado");
    router.push("/");
  };

  return (
    <View className="flex-1 bg-white justify-center p-12">
      <TextInput
        placeholder="Email"
        className="h-12 border border-gray-300 rounded-lg mb-3 px-3"
      />
      <TextInput
        placeholder="Password"
        className="h-12 border border-gray-300 rounded-lg mb-3 px-3"
        secureTextEntry
      />
      <View className="mt-2 mb-4">
        <Button title="Registar" onPress={handleRegister} />
      </View>
    </View>
  );
}
