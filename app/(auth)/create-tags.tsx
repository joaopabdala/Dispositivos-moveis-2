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
     
    </View>
  );
}
