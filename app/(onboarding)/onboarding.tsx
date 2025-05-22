import { View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { AntDesign, Octicons } from '@expo/vector-icons';
import Image from '../../components/image/image';
import { OnboardingImages, OnboardingImagesDescription, OnboardingImagesTitle } from '../../assets/registry/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';

// Get screen dimensions for responsive calculations
const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 370;
const isShortScreen = height < 700;

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
        router.push('/(auth)/signup');
    }

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.push('/(auth)/signup');
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className={`flex-1 ${isSmallScreen ? 'p-4' : 'p-6'}`}>
                <View className='px-4'>
                    <TouchableOpacity onPress={handleSkip} className='self-end'>
                        <Text className={`text-[#0d1d35] ${isSmallScreen ? 'text-sm' : 'text-base'} font-inter-medium`}>
                            Skip
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <View className={`flex-1 items-center justify-center ${isShortScreen ? 'my-2' : 'my-4'}`}>
                    <View className={`w-full ${isShortScreen ? 'h-[40%]' : 'h-[50%]'} ${isSmallScreen ? 'mb-4' : 'mb-8'}`}>
                        <Image
                            source={onboardingData[currentIndex].image}
                            resizeMode="contain"
                            containerClassName="rounded-2xl"
                        />
                    </View>
                    
                    <Text className={`${isSmallScreen ? 'text-xl' : 'text-2xl'} font-lato-bold text-center ${isSmallScreen ? 'mb-2' : 'mb-3'}`}>
                        {onboardingData[currentIndex].title}
                    </Text>
                    
                    <Text className={`${isSmallScreen ? 'text-base' : 'text-lg'} font-inter-regular text-center text-gray-600 px-4`}>
                        {onboardingData[currentIndex].description}
                    </Text>
                </View>
                
                <View className={`flex-row items-center justify-between ${isShortScreen ? 'mb-5' : 'mb-14'}`}>
                    <View className='rounded-full w-14 h-14 overflow-hidden'>
                        <Button
                            className='flex-1 items-center justify-center'
                            onPress={handlePrevious}
                            disabled={currentIndex === 0}
                            variant="secondary"
                        >
                            <AntDesign 
                                name="arrowleft" 
                                size={24} 
                                color={currentIndex === 0 ? "#ccc" : "#0d1d35"} 
                            />
                        </Button>
                    </View>
                    
                    <View className='flex-row justify-center gap-x-3 items-center'>
                        {onboardingData.map((_, index) => (
                            <Octicons
                                key={index}
                                name={index === currentIndex ? "dot-fill" : "dot"}
                                size={index === currentIndex ? (isSmallScreen ? 16 : 20) : (isSmallScreen ? 12 : 16)}
                                color={index === currentIndex ? "#0d1d35" : "#ccc"}
                            />
                        ))}
                    </View>
                    
                    <View className='rounded-full w-14 h-14 overflow-hidden'>
                        <Button
                            className='flex-1 items-center justify-center bg-[#0d1d35]'
                            onPress={handleNext}
                        >
                            <AntDesign 
                                name="arrowright" 
                                size={isSmallScreen ? 20 : 24} 
                                color="white" 
                            />
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
