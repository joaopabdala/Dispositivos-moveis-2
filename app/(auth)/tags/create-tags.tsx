import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import ColorPicker from "react-native-wheel-color-picker";
import api from "../../../pocketbase";
import setUserToken from "../../../states/auth-service";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";

export default function createTag() {
  const [color, setColor] = useState("#FF0000");
  const [name, setName] = useState("");

  const onColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const { token, id } = setUserToken();
  const createNewTag = async () => {
    try {
      const response = await api.post(
        "/collections/tags/records",
        {
          name: name,
          color: color,
          user_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/(auth)/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Erro ao criar tag:", error.response.data);
          alert("Erro ao criar tag. Verifique os dados.");
        } else if (error.request) {
          alert("Sem resposta do servidor ao criar tag.");
        } else {
          alert("Erro inesperado ao criar tag.");
        }
      } else {
        console.error("Erro não Axios:", error);
        alert("Erro desconhecido ao criar tag.");
      }
    }
  };

  return (
    <View className="bg-[#1E1E1E] h-full p-4">
      <Text className="text-white text-lg mb-4">Criar Tag</Text>

      <View className="flex-row items-center h-12 border border-gray-300 rounded-lg mb-3 px-3 bg-white">
        <TextInput
          placeholder="Nome"
          className="flex-1 ml-2 text-base"
          placeholderTextColor="#888"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View className="rounded-lg p-4 h-72 mb-24">
        <ColorPicker
          color={color}
          onColorChange={onColorChange}
          thumbSize={30}
          sliderSize={20}
          noSnap={true}
          row={false}
        />
      </View>

      <TouchableOpacity
        onPress={createNewTag}
        className="bg-blue-500 p-3 rounded-lg items-center"
      >
        <Text className="text-white font-bold">Criar Tag</Text>
      </TouchableOpacity>
    </View>
  );
}
