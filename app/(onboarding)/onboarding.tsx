import { View, Text, SafeAreaView, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { AntDesign, Octicons } from '@expo/vector-icons';
import Image from '../../components/image/image';
import { OnboardingImages, OnboardingImagesDescription, OnboardingImagesTitle } from '../../assets/registry/images';

// Sample onboarding content
const onboardingData = [
  {
    title: OnboardingImagesTitle.title1,
    description: OnboardingImagesDescription.description1,
    image: OnboardingImages.onboard1
  },
  {
    title: OnboardingImagesTitle.title2,
    description: OnboardingImagesDescription.description2,
    image: OnboardingImages.onboard2
  },
  {
    title: OnboardingImagesTitle.title3,
    description: OnboardingImagesDescription.description3,
    image: OnboardingImages.onboard3
  }
];

export default function Onboarding() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSkip = () => {
        router.push('/(onboarding)/signup');
    }

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.push('/(onboarding)/signup');
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='h-screen p-6'>
                <View className={` px-4 ${Platform.OS === 'ios' ? '' : 'py-10'}`}>
                    <TouchableOpacity onPress={handleSkip} className='self-end'>
                        <Text className='text-[#0d1d35] text-base font-inter-medium'>Skip</Text>
                    </TouchableOpacity>
                </View>

                <View className='flex-1 items-center justify-center'>
                    <View className='w-full h-[50%] mb-8'>
                        <Image 
                            source={onboardingData[currentIndex].image}
                            resizeMode="contain"
                            containerClassName="rounded-2xl"
                        />
                    </View>
                    <Text className='text-2xl font-lato-bold text-center mb-3'>
                        {onboardingData[currentIndex].title}
                    </Text>
                    <Text className='text-lg font-inter-regular text-center text-gray-600 px-4'>
                        {onboardingData[currentIndex].description}
                    </Text>
                </View>

                <View className='flex-row items-center justify-between mb-20'>
                    <View className='rounded-full w-14 h-14 overflow-hidden'>
                        <TouchableOpacity 
                            className='flex-1 items-center justify-center bg-gray-100' 
                            onPress={handlePrevious}
                            disabled={currentIndex === 0}
                        >
                            <AntDesign name="arrowleft" size={24} color={currentIndex === 0 ? "#ccc" : "#0d1d35"} />
                        </TouchableOpacity>
                    </View>

                    <View className='flex-row justify-center gap-x-3 items-center'>
                        {onboardingData.map((_, index) => (
                            <Octicons 
                                key={index}
                                name={index === currentIndex ? "dot-fill" : "dot"} 
                                size={index === currentIndex ? 20 : 16} 
                                color={index === currentIndex ? "#0d1d35" : "#ccc"} 
                            />
                        ))}
                    </View>

                    <View className='rounded-full w-14 h-14 overflow-hidden'>
                        <TouchableOpacity 
                            className='flex-1 items-center justify-center bg-[#0d1d35]' 
                            onPress={handleNext}
                        >
                            <AntDesign name="arrowright" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
