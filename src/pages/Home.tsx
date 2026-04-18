// src/pages/Home.tsx
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

export const Home = () => {

const navigation = useNavigation<any>();

  return (
    <View className="justify-center items-center flex-1">
      <Text
        style={{ fontFamily: "InterRegular" }}
        className="text-3xl"
      >
        Home
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        className="mt-4 bg-blue-500 px-4 py-2 rounded"> 
        <Text className="text-white">Go to Settings</Text>
      </TouchableOpacity>

    </View>
  );
};