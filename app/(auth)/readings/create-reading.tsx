import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Tag, { TagProps } from "../../../components/Tag";
import { router, useFocusEffect } from "expo-router";
import { Icon } from "@rneui/base";
import api from "../../../pocketbase";
import setUserToken from "../../../states/auth-service";
import axios from "axios";

export default function createReading() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { token, id } = setUserToken();

  const handleCreateNewTag = () => {
    router.push("/(auth)/tags/create-tags");
  };

  const handleTagSelect = (id: string) => {
    setSelectedTags((prevSelectedTags) => {
      const isSelected = prevSelectedTags.includes(id);
      if (isSelected) {
        return prevSelectedTags.filter((tagId) => tagId !== id);
      } else {
        return [...prevSelectedTags, id];
      }
    });
  };

  const getTags = async () => {
    if (!token) return;
    try {
      const response = await api.get(`/collections/tags/records`, {
        params: {
          filter: `user_id='${id}'`,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTags(response.data.items);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Erro ao buscar tags:", error.response.data);
          alert("Erro ao carregar suas tags.");
        } else if (error.request) {
          alert("Sem resposta do servidor ao buscar tags.");
        } else {
          alert("Erro inesperado ao buscar tags.");
        }
      } else {
        console.error("Erro desconhecido ao buscar tags:", error);
      }
    }
  };

  const handleCreateNewReading = async () => {
    try {
      await api.post(
        "/collections/readings/records",
        {
          title: name,
          link: link,
          user_id: id,
          read_at: null,
          tags_ids: selectedTags,
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
          console.error("Erro ao criar leitura:", error.response.data);
          alert("Erro ao salvar leitura. Verifique os campos.");
        } else if (error.request) {
          alert("Sem resposta do servidor ao salvar leitura.");
        } else {
          alert("Erro inesperado ao salvar leitura.");
        }
      } else {
        console.error("Erro não Axios:", error);
        alert("Erro desconhecido ao salvar leitura.");
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTags();
    }, [token])
  );

  return (
    <View className="bg-[#1E1E1E] h-full p-4">
      <View className="bg-white p-4 rounded-lg">
        <Text className="text-black text-lg mb-4">Criar Reading</Text>
        <View className="flex-row items-center h-12 border border-gray-300 rounded-lg mb-3 px-3 bg-white">
          <TextInput
            placeholder="Nome"
            className="flex-1 ml-2 text-base"
            placeholderTextColor="#888"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View className="flex-row items-center h-12 border border-gray-300 rounded-lg mb-3 px-3 bg-white">
          <TextInput
            placeholder="Link"
            className="flex-1 ml-2 text-base"
            placeholderTextColor="#888"
            value={link}
            onChangeText={(text) => setLink(text)}
          />
        </View>
        <View className="gap-2 bg-white p-2 rounded-lg border border-gray-300">
          <View className="flex-row justify-between">
            <Text className="text-black mb-2">Tags:</Text>
            <TouchableOpacity
              className="flex-row items-center bg-blue-500 rounded-full px-4 py-1 self-start"
              onPress={handleCreateNewTag}
            >
              <Text className="text-white mr-2">add</Text>
              <View className="bg-[#D9D9D9] p-1 rounded-full">
                <Icon
                  backgroundColor="#D9D9D9"
                  color="#8D8686"
                  size={12}
                  name="plus"
                  type="ant-design"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between flex-wrap gap-2">
            {tags.map((tag: TagProps) => (
              <Tag
                key={tag.id}
                color={tag.color}
                id={tag.id}
                name={tag.name}
                onPress={() => handleTagSelect(tag.id)}
                selected={selectedTags.includes(tag.id)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={handleCreateNewReading}
          className="bg-blue-500 p-3 rounded-lg items-center mt-6"
        >
          <Text className="text-white font-bold">Criar Reading</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
