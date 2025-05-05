import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import Tag, { TagProps } from "../../components/Tag";
import Reading, { readingsProps } from "../../components/Reading";

import { readings } from "../../mocks/readings";
import { tags } from "../../mocks/tags";
import { Icon } from "@rneui/base";
import { router } from "expo-router";

const createNewTag = () => {
  router.push('create-tags')
};

export default function profile() {
  return (
    <View className="bg-[#1E1E1E] h-full ">
      <View className="bg-white p-2 mt-4 mx-8 rounded-lg">
        <View className="flex-row justify-between">
          <Text>Suas Tags:</Text>
          <TouchableOpacity
            className="flex-row items-center bg-blue-500 rounded-full px-4 py-1 self-start"
            onPress={createNewTag}
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
            <Tag name={item.name} id={item.id} key={item.id} />
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
            tag_ids={item.tag_ids}
            created_at={item.created_at}
            read_at={item.read_at}
          />
        ))}
      </View>
    </View>
  );
}
