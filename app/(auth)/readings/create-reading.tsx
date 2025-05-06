import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { tags } from "../../../mocks/tags";
import Tag, { TagProps } from "../../../components/Tag";
import { router } from "expo-router";
import { Icon } from "@rneui/base";

export default function createReading() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handleCreateNewTag = () => {
    router.push("/(auth)/tags/create-tags");
  };

  const handleTagSelect = (id: number) => {
    setSelectedTags((prevSelectedTags) => {
      const isSelected = prevSelectedTags.includes(id);
      if (isSelected) {
        return prevSelectedTags.filter((tagId) => tagId !== id);
      } else {
        return [...prevSelectedTags, id];
      }
    });
  };

  const handleCreateNewReading = () => {
    console.log({
      name: name,
      link: link,
      selectedTags: selectedTags,
    })
  };

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
