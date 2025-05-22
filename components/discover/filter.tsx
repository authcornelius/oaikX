import { View, Text, TextInput, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import Button from "../Button";

// Get screen dimensions for responsive calculations
const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;

export default function Filter() {
    const handleFilter = () => {
        console.log("Filter button pressed");
    };

    return (
        <View className={`flex-row items-center justify-between rounded-lg gap-x-2 ${isSmallScreen ? 'mt-3 mb-3' : 'mt-5 mb-5'}`}>
            <View className={`flex-row items-center flex-1 gap-x-2 ${isSmallScreen ? 'h-12' : 'h-14'} rounded-md bg-gray-100`}>
                <Feather
                    name="search"
                    size={isSmallScreen ? 20 : 24}
                    color="#0d1d35"
                    className="ml-2"
                />
                <TextInput
                    className={`flex-1 h-full px-2 text-gray-600 font-inter-regular ${isSmallScreen ? 'text-sm' : 'text-base'} mb-1 ml-1`}
                    placeholder="Search"
                    placeholderTextColor="#9ca3af"
                />
            </View>
            
            <Button
                className={`rounded-md ${isSmallScreen ? 'h-12 w-12' : 'h-14 w-14'} flex justify-center items-center`}
                variant="primary"
                onPress={() => {handleFilter()}}
            >
                <FontAwesome6
                    name="sliders"
                    size={isSmallScreen ? 16 : 20}
                    color="#ffff"
                />
            </Button>
        </View>
    );
}
