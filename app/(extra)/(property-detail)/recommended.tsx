import { View, Text, ScrollView, Dimensions } from "react-native";
import React from "react";
import Back from "@/components/Back";
import { SafeAreaView } from "react-native-safe-area-context";
import { recommendedData } from "@/constants/data";
import DoubleCard from "@/components/property/doubleCard";

export default function Recommended() {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 60) / 2; // 60 accounts for padding and gap

  const handlePropertyPress = (id: string) => {
    // Handle property press, e.g., navigate to property detail
    console.log(`Property ${id} pressed`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View className="flex flex-row items-center justify-between">
        <Back />
        <Text className="text-lg font-inter-medium">Recommended Property</Text>
        <View className=""></View>
      </View>

      <ScrollView className="mt-5" showsVerticalScrollIndicator={false}>
        <View className="flex-1 flex-row flex-wrap justify-between gap-y-5">
          {recommendedData.map((property) => (
            <DoubleCard
              key={property.id}
              property={property}
              onPress={handlePropertyPress}
              cardWidth={cardWidth}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
