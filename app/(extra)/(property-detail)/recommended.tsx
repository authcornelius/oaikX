import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React from "react";
import Back from "@/components/Back";
import { SafeAreaView } from "react-native-safe-area-context";
import Image1 from "@/assets/properties/three-bedroom-apartmnet-union-market-noho-washington-dc-luxury.jpeg";

export default function Recommended() {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 60) / 2; // 60 accounts for padding and gap

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View className="flex flex-row items-center justify-between">
        <Back />
        <Text className="text-lg font-inter-medium">Recommended Property</Text>
        <View className=""></View>
      </View>

      <ScrollView className="mt-5" showsVerticalScrollIndicator={false}>
        <View className="flex-1 flex-row flex-wrap justify-between gap-y-5">
          {/* First Card */}
          <View
            style={{ width: cardWidth }}
            className="border border-gray-300 rounded-lg overflow-hidden p-2 mb-2"
          >
            <View className="h-40">
              <Image
                source={Image1}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text>Hello world</Text>
            </View>
          </View>

          {/* Second Card */}
          <View
            style={{ width: cardWidth }}
            className="border border-gray-300 rounded-lg overflow-hidden p-2 mb-2"
          >
            <View className="h-40">
              <Image
                source={Image1}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text>Hello world</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
