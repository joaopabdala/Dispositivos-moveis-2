import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Tag from "../../components/Tag";
import Reading, { readingsProps } from "../../components/Reading";

import { readings } from "../../mocks/readings";
import { Icon } from "@rneui/base";
import { router } from "expo-router";

const handleNewReading = () => {
  router.push('/(auth)/readings/create-reading');
}

export default function profile() {
  return (
    <View className="bg-[#1E1E1E] h-full">
      <View className="p-2 flex-row gap-2 mt-3">
        <Tag id={0} name="unread" />
        <Tag id={0} name="read" />
        <Tag id={0} name="all" />
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
      <View>
        <TouchableOpacity 
        onPress={handleNewReading}
        className="self-end mr-5 bg-white rounded-full p-4">
          <Icon
              color="red"
              size={24}
              name="plus"
              type="ant-design"
            />
        </TouchableOpacity>
      </View>
    </View>
  );
}
