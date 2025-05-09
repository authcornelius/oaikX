import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, FontAwesome6 } from "@expo/vector-icons";

export default function Filter() {
  return (
    <View className="flex-row items-center justify-between rounded-lg gap-x-3 mt-5 mb-5">
        <View className="flex-row items-center flex-1 gap-x-2 h-14 rounded-md bg-gray-100">
            <Feather 
                name="search" 
                size={24} 
                color="#0d1d35"
                className="ml-2"
            />

            <TextInput
                className="flex-1 h-full px-3 text-gray-600 font-inter-regular mb-1 ml-2"
                placeholder="Search"
                placeholderTextColor="#9ca3af"
            />
        </View>

        <TouchableOpacity className="rounded-md bg-[#0d1d35] h-14 w-14 flex justify-center items-center">
            <FontAwesome6 
                name="sliders" 
                size={20} 
                color="#ffff"
            />
        </TouchableOpacity>
    </View>
  );
}
