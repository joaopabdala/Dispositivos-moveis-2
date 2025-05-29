import { View, Text, TouchableOpacity, Linking } from "react-native";
import React, { useCallback, useState } from "react";
import { Icon } from "@rneui/themed";
import Tag, { TagProps } from "./Tag";
import { tags as allTags } from "../mocks/tags";
import api from "../pocketbase";
import setUserToken from "../states/auth-service";
import { useFocusEffect } from "expo-router";

export type readingsProps = {
  id: number;
  title: string;
  link: string;
  tags_ids: string[] | null;
  created: Date | undefined;
  read_at: Date | string | null;
};

const handleLinkPress = (link: string) => {
  Linking.openURL(link);
};

export default function Reading({
  id,
  title,
  link,
  tags_ids,
  created,
  read_at,
}: readingsProps) {
  const [expanded, setExpanded] = useState(false);

  const [localReadAt, setLocalReadAt] = React.useState(read_at);
  const [tags, setTags] = useState([]);

  const fetchTagsByIds = async (ids: string[]) => {
    if (!token || ids.length === 0) return;

    try {
      const filter = ids.map((id) => `id="${id}"`).join(" || ");
      const response = await api.get(
        `/collections/tags/records?filter=${encodeURIComponent(filter)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTags(response.data.items);
    } catch (error) {
      console.log("Erro ao buscar tags:", error);
    }
  };

  const { token } = setUserToken();
  const handleMarkAsRead = async (id: string) => {
    let read_at_change = "";

    if (localReadAt == "" || localReadAt == null) {
      read_at_change = new Date().toISOString();
    }

    try {
      await api.patch(
        `/collections/readings/records/${id}`,
        {
          read_at: read_at_change,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLocalReadAt(read_at_change);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (tags_ids && tags_ids.length > 0) {
        fetchTagsByIds(tags_ids);
      }
    }, [token, tags_ids])
  );

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      className="bg-white mx-4 rounded-lg my-2 p-6 gap-y-2"
    >
      <Text className="text-black mr-2 text-xl">{title}</Text>
      <Text className="self-end">
        {created != null
          ? created.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "Data não disponível"}
      </Text>
      {expanded && (
        <>
          <TouchableOpacity onPress={() => handleLinkPress(link)}>
            <Text className="text-blue-500 underline">Abrir link</Text>
          </TouchableOpacity>

          <View>
            <Text className="mb-2">Tags:</Text>
            <View className="flex-row flex-wrap gap-2">
              {tags.map((tag: TagProps) => (
                <Tag
                  color={tag.color}
                  id={tag.id}
                  key={tag.id}
                  name={tag.name}
                />
              ))}
            </View>
          </View>

          <View className="self-end flex-row gap-x-2">
            <Text>Read:</Text>
            <TouchableOpacity
              className={`${
                localReadAt == "" ? "bg-[#D9D9D9]" : "bg-blue-500"
              } rounded-full p-2`}
              onPress={() => handleMarkAsRead(id.toString())}
            >
              <Icon
                color={localReadAt == "" ? "black" : "white"}
                size={12}
                name="check"
                type="ant-design"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}
