import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Image from "@/components/image/image";
import { OnboardingImages } from "@/assets/registry/images";

export default function HomeScreen() {
  const router = useRouter();

  const handleLoginRoute = () => {
    router.push("/(onboarding)/login");
  };

  const handleOnboardingRoute = () => {
    router.push("/(onboarding)/onboarding");
  };

  return (
    <View className="flex-1 bg-[#ffff] h-screen">
      <SafeAreaView className="flex-1 items-center">
        <Image
          source={OnboardingImages.intro}
          className="w-full h-full"
          resizeMode="contain"
          accessibilityLabel="Onboarding introduction image"
        />
      </SafeAreaView>

      <View className="bg-[#e7e7e7] bottom-0 left-0 right-0 rounded-t-[3rem] p-6 shadow-lg h-[35%] grid grid-cols-2">
        <View>
          <Text className="text-[1.6rem] leading-9 flex justify-center text-center mt-4 font-lato-bold">
            Experience secured buying, booking and browsing with ease
          </Text>
          <Text className="text-gray-600 text-center mt-2 font-inter-regular leading-6">
            Buy, rent, or book — oaikX gives you a smarter way to live, all in
            one secure platform.
          </Text>
        </View>

        <View className="h-full top-10 gap gap-col-2 gap-y-3">
          <Button
            className="bg-[#0d1d35] rounded-full p-4 shadow-sm"
            variant="primary"
            size="lg"
            onPress={() => handleOnboardingRoute()}
          >
            <Text className="text-center text-[#ffff] text-xl font-lato-bold">
              Let's Get Started
            </Text>
          </Button>

          <View className="flex-row items-center justify-center">
            <Text className="font-inter-regular">Already have an account?</Text>
            <TouchableOpacity 
              onPress={() => handleLoginRoute()}
            >
              <Text
                className="text-[#0d1d35] font-inter-bold ml-2"
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
