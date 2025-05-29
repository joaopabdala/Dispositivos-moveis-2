import { Icon, Text } from "@rneui/base";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

import api from "../pocketbase";
import { ClientResponseError } from "pocketbase";
import axios from "axios";

export default function IndexScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSecure, setPasswordSecure] = useState(true);

  const handleLogin = () => {
    router.push("/(auth)/(home)");
  };

const handleRegister = async () => {
  if (!email || !password) {
    Alert.alert("Erro", "Por favor, preencha o email e a senha.");
    return;
  }

  try {
    const record = await api.post("/collections/users/records", {
      email: email,
      password: password,
      passwordConfirm: password,
      username: email,
    });

    console.log("Usuário registrado:", record.data);
    Alert.alert("Sucesso", "Usuário registrado com sucesso!");
    router.push("/");

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Status:", error.response.status);
        const errorData = error.response.data;
        console.log("Data do erro:", errorData);

        if (
          errorData.data?.email?.code === "validation_not_unique" &&
          errorData.data?.email?.message
        ) {
          Alert.alert("Erro ao registrar", errorData.data.email.message);
        } else if (errorData.message) {
          Alert.alert("Erro ao registrar", errorData.message);
        } else {
          Alert.alert("Erro ao registrar", "Erro desconhecido do servidor.");
        }
      } else if (error.request) {
        console.log("Erro na requisição, sem resposta:", error.request);
        Alert.alert("Erro na requisição", "Servidor não respondeu.");
      } else {
        console.log("Erro desconhecido Axios:", error.message);
        Alert.alert("Erro desconhecido", error.message);
      }
    } else {
      console.log("Erro não Axios:", error);
      Alert.alert("Erro inesperado", "Algo deu errado.");
    }
  }
};

  const handlePasswordSecure = () => {
    setPasswordSecure(!passwordSecure);
  };

  return (
    <View className="flex-1 bg-white justify-center p-12">
      <Text h1 className="mb-2 text-center">
        Register
      </Text>
      <View className="flex-row items-center h-12 border border-gray-300 rounded-lg mb-3 px-3 bg-white">
        <Icon type="MaterialCommunityIcons" name="email" />
        <TextInput
          placeholder="Email"
          className="flex-1 ml-2 text-base"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
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
        <Button title="Registrar" onPress={handleRegister} />
      </View>
    </View>
  );
}
