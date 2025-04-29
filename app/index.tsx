import { Icon, Input, Text } from "@rneui/base";
import { Button } from "@rneui/themed";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/(auth)/profile");
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  const [passwordSecure, setPasswordSecure] = useState(true);

  const handlePasswordSecure = () => {
    setPasswordSecure(!passwordSecure);
  };

  return (
    <View className="flex-1 bg-white justify-center p-12">
      <Text h1 className="mb-2 text-center">
        Login
      </Text>
      <View className="flex-row items-center h-12 border border-gray-300 rounded-lg mb-3 px-3 bg-white">
        <Icon type="MaterialCommunityIcons" name="email" />
        <TextInput
          placeholder="Email"
          className="flex-1 ml-2 text-base"
          placeholderTextColor="#888"
        />
      </View>

      <View className="flex-row items-center h-12 border border-gray-300 rounded-lg mb-3 px-3 bg-white">
        <Icon
          type="MaterialCommunityIcons"
          name="lock"
          color="#888"
          size={20}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={passwordSecure}
          className="flex-1 ml-2 text-base text-black"
          placeholderTextColor="#888"
        />
        <Icon
          type="ant-design"
          name={passwordSecure ? "eye" : "eyeo"}
          onPress={handlePasswordSecure}
          size={24}
          color="black"
        />
      </View>

      <View className="mt-2 mb-4">
        <Button title="Login" onPress={handleLogin} />
      </View>
      <Link href="/register" className="text-center text-blue-500 font-medium">
        Create Account
      </Link>
    </View>
  );
}
