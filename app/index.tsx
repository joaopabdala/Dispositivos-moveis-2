import { Link, useRouter } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/(auth)/profile");
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <View className="flex-1 bg-white justify-center p-12">
      <TextInput
        placeholder="Email"
        className="h-12 border border-gray-300 rounded-lg mb-3 px-3"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="h-12 border border-gray-300 rounded-lg mb-3 px-3"
      />
      <View className="mt-2 mb-4">
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Link href="/register" className="text-center text-blue-500 font-medium">
        Create Account
      </Link>
    </View>
  );
}
