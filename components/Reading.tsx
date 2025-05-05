import { View, Text, TouchableOpacity, Linking } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import Tag from "./Tag";
import { tags as allTags } from "../mocks/tags";

export type readingsProps = {
  id: number;
  title: string;
  link: string;
  tag_ids: number[] | null;
  created_at: Date;
  read_at: Date | null;
};

const handleLinkPress = (link: string) => {
  Linking.openURL(link);
};

export default function Reading({
  id,
  title,
  link,
  tag_ids,
  created_at,
  read_at,
}: readingsProps) {
  const [expanded, setExpanded] = useState(false);
  const readingTags = tag_ids ? allTags.filter(tag => tag_ids.includes(tag.id)) : [];


  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      className="bg-white mx-4 rounded-lg my-2 p-6 gap-y-2"
    >
      <Text className="text-black mr-2 text-xl">{title}</Text>
      <Text className="self-end">
        {created_at.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </Text>
      {expanded && (
        <>
          <TouchableOpacity onPress={() => handleLinkPress(link)}>
            <Text className="text-blue-500 underline">Abrir link</Text>
          </TouchableOpacity>

          <View>
            <Text className="mb-2">Tags:</Text>
            <View className="flex-row flex-wrap gap-2">
            {readingTags.map((tag) => (
                  <Tag color={tag.color} id={tag.id} key={tag.id} name={tag.name} />
                ))}
            </View>
          </View>

          <View className="self-end flex-row gap-x-2">
            <Text>Read:</Text>
            <TouchableOpacity
              className={`${
                read_at == null ? "bg-[#D9D9D9]" : "bg-blue-500"
              } rounded-full p-2`}
            >
              <Icon
                color={read_at == null ? "black" : "white"}
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
