import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import { color } from "@rneui/base";

export type TagProps = {
    id: number
  name: string
  color?: string | null
};

const handleTagFilter = (name:string) => {
    console.log(name)
}

export default function Tag({ name, color=null }: TagProps) {
  return (
    <TouchableOpacity
    className="flex-row items-center rounded-full px-4 py-1 self-start"
    style={{ backgroundColor: color ?? "#3B82F6" }} // azul padrão
    onPress={() => handleTagFilter(name)}
    >
      <Text className="text-white mr-2">{name}</Text>
      <View className="bg-[#D9D9D9] p-1 rounded-full">
        <Icon
          backgroundColor="#D9D9D9"
          color="#8D8686"
          size={12}
          name="check"
          type="ant-design"
        />
      </View>
    </TouchableOpacity>

  );
}