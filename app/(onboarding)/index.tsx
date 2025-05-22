import { Text, TouchableOpacity, View, Platform, Dimensions } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import Image from "@/components/image/image";
import { OnboardingImages } from "@/assets/registry/images";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const router = useRouter();
  const { height, width } = Dimensions.get('window');

  const isSmallScreen = width < 370;

  const handleLoginRoute = () => {
    router.push("/(auth)/login");
  };

  const handleOnboardingRoute = () => {
    router.push("/(onboarding)/onboarding");
  };

  return (
    <View className="flex-1 bg-[#ffff]">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Image
            source={OnboardingImages.intro}
            className="w-full"
            style={{ height: '85%' }}
            resizeMode="contain"
            accessibilityLabel="Onboarding introduction image"
          />
        </View>
      </SafeAreaView>

      <View 
        className="bg-[#e7e7e7] bottom-0 left-0 right-0 rounded-t-[3rem] p-6 shadow-lg"
        style={{ minHeight: height * 0.35 }}
      >
        <View className="flex flex-col">
          <View className="mb-4">
            <Text className='leading-9 text-center font-lato-bold text-2xl'>
              Experience secured buying, booking and browsing with ease
            </Text>
            <Text className="text-gray-600 text-center mt-2 font-inter-regular leading-6">
              Buy, rent, or book — oaikX gives you a smarter way to live, all in
              one secure platform.
            </Text>
          </View>

          <View className={` ${Platform.OS === 'android' ? 'mt-10' : 'mt-10'}`}>
            <Button
              className="rounded-full p-4 shadow-sm"
              variant="primary"
              size="lg"
              onPress={() => handleOnboardingRoute()}
            >
              <Text className="text-center text-[#ffff] text-xl font-lato-bold">
                Let's Get Started
              </Text>
            </Button>

            <View className={`flex-row items-center justify-center ${Platform.OS === 'android' ? 'mt-4 mb-8' : 'mt-3 '}`}>
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
    </View>
  );
}
