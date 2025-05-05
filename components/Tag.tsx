import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";

type TagProps = {
  name: string;
};

const handleTagFilter = (name:string) => {
    console.log(name)
}

export default function Tag({ name }: TagProps) {
  return (
    <TouchableOpacity
    className="flex-row items-center bg-blue-500 rounded-full px-4 py-1 self-start"
    onPress={() => handleTagFilter(name)}
    >
      <Text className="text-white mr-2">{name}</Text>
      <View className="bg-[#D9D9D9] p-1 rounded-full">
        <Icon
          backgroundColor="#D9D9D9"
          color="#8D8686"
          size="12"
          name="check"
          type="ant-design"
        />
      </View>
    </TouchableOpacity>

  );
}
