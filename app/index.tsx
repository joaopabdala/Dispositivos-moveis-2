import { Icon, Input, Text } from "@rneui/base";
import { Button } from "@rneui/themed";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import api from "../pocketbase";
import setUserToken from "../states/auth-service";
import axios from "axios";

export default function IndexScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = setUserToken();

  const handleLogin = async () => {
    console.log(email, password);

    try{
      const response = await api.post(
              "/collections/users/auth-with-password",
              {
                identity: email,
                password: password,
              }
            );
            if(response.data["token"]){
             setUser(response.data["token"], response.data["record"]["id"]);
              router.push("/(auth)/profile");
            }

    } catch (error) {
     if (axios.isAxiosError(error)) {
    if (error.response) {
      const { code, message, data } = error.response.data;
      console.error("Erro de autenticação:", message);

      if (code === 400 || message === "Failed to authenticate.") {
        alert("Email ou senha inválidos.");
      } else {
        alert("Erro no login. Tente novamente.");
      }
    } else if (error.request) {
      console.error("Sem resposta do servidor:", error.request);
      alert("Sem resposta do servidor. Verifique sua conexão.");
    } else {
      console.error("Erro na requisição:", error.message);
      alert("Erro inesperado. Tente novamente mais tarde.");
    }
  } else {
    console.error("Erro desconhecido:", error);
    alert("Erro desconhecido.");
  }
    }
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
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
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
