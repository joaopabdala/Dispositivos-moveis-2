import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Tag from "../../components/Tag";
import Reading, { readingsProps } from "../../components/Reading";

import { Icon } from "@rneui/base";
import { router, useFocusEffect } from "expo-router";
import setUserToken from "../../states/auth-service";
import api from "../../pocketbase";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
const handleNewReading = () => {
  router.push("/(auth)/readings/create-reading");
};

export default function profile() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<string | null>(null);

  const { id, token } = setUserToken();
  const getReadings = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      let filterQuery = `user_id='${id}'`;

      if (filter === "unread") {
        filterQuery += '&&read_at = ""';
      } else if (filter === "read") {
        filterQuery += '&&read_at != ""';
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
          console.error("Erro na resposta da API:", err.response.data);
          alert("Erro ao carregar leituras: " + err.response.data.message);
        } else {
          alert("Erro de rede ao carregar leituras.");
        }
      } else {
        console.error("Erro desconhecido:", err);
        alert("Erro inesperado ao carregar leituras.");
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReadings();
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
        <View className="p-2 flex-row gap-2 mt-3">
          <Tag id={"0"} onPress={() => setFilter("unread")} name="unread" />
          <Tag id={"0"} onPress={() => setFilter("read")} name="read" />
          <Tag id={"0"} onPress={() => setFilter(null)} name="all" />
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

      <TouchableOpacity
        onPress={handleNewReading}
        className="absolute bottom-5 right-5 bg-white rounded-full p-4"
      >
        <Icon color="red" size={24} name="plus" type="ant-design" />
      </TouchableOpacity>
    </View>
  );
}
