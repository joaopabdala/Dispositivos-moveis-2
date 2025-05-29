import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import Tag, { TagProps } from "../../../components/Tag";
import Reading, { readingsProps } from "../../../components/Reading";

import { Icon } from "@rneui/base";
import { router, useFocusEffect } from "expo-router";
import setUserToken from "../../../states/auth-service";
import api from "../../../pocketbase";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const handleCreateNewTag = () => {
  router.push("/(auth)/tags/create-tags");
};

export default function profile() {
  const [readings, setReadings] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<string | null>(null);

  const { token, id } = setUserToken();

  const handleFilterChange = (newFilter: string | null) => {
    let filerChange = newFilter;
    if (newFilter === filter) {
      filerChange = null;
    }
    setFilter(filerChange);
  };

  const getReadings = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      let filterQuery = `user_id='${id}'`;
      if (filter != null) {
        filterQuery += ` && tags_ids~'${filter}'`;
      }

      const response = await api.get("/collections/readings/records", {
        params: {
          expand: "tags_ids",
          filter: filterQuery,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setReadings(response.data.items);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error(
            "Erro na resposta da API (readings):",
            err.response.data
          );
          alert("Erro ao carregar leituras: " + err.response.data.message);
        } else {
          alert("Erro de rede ao carregar leituras.");
        }
      } else {
        console.error("Erro desconhecido (readings):", err);
        alert("Erro inesperado ao carregar leituras.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getTags = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/collections/tags/records", {
        params: {
          filter: `user_id='${id}'`,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTags(response.data.items);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error("Erro na resposta da API (tags):", err.response.data);
          alert("Erro ao carregar tags: " + err.response.data.message);
        } else {
          alert("Erro de rede ao carregar tags.");
        }
      } else {
        console.error("Erro desconhecido (tags):", err);
        alert("Erro inesperado ao carregar tags.");
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReadings();
      getTags();
    }, [token, filter])
  );

  if (readings === null || loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Carregando...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-[#1E1E1E]">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="bg-white p-2 mt-4 mx-8 rounded-lg">
          <View className="flex-row justify-between">
            <Text>Suas Tags:</Text>
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
          <View className="flex-row flex-wrap gap-2 mt-3">
            {tags.map((item: TagProps) => (
              <Tag
                onPress={() => handleFilterChange(item.id)}
                name={item.name}
                id={item.id}
                key={item.id}
              />
            ))}
          </View>
        </View>

        <View className="mt-6">
          {readings.map((item: readingsProps) => (
            <Reading
              key={item.id}
              id={item.id}
              title={item.title}
              link={item.link}
              tags_ids={item.tags_ids}
              created={item.created ? new Date(item.created) : undefined}
              read_at={item.read_at}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
