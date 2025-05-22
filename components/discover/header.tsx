import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProfileImg from '@/assets/images/9334176.jpg'

// Get screen dimensions for responsive calculations
const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;

interface HeaderProps {
  onAvatarPress?: () => void;
  userName?: string;
  location?: string;
  notificationCount?: number;
  showBackButton?: boolean;
  title?: string;
  isSidebarOpen?: boolean;
}

export default function Header({
  onAvatarPress,
  userName = 'Cornel',
  location = 'Benin City, NGA',
  notificationCount = 5000,
  showBackButton = false,
  title,
}: HeaderProps) {
  const router = useRouter();

  
  const handleNotification = () => {
    router.push('/(extra)/(notification)/notification');
  };
 
  const toggleSidebar = () => {
    if (onAvatarPress) {
      onAvatarPress();
    } else if (global.toggleSidebar) {
      // Use the global sidebar toggle if no onAvatarPress is provided
      global.toggleSidebar();
    }
  };
  

  return (
    <View className='flex-row justify-between items-center pt-1 pb-3 mt-2'>
      {showBackButton ? (
        <View className='flex-row items-center'>
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <AntDesign name="arrowleft" size={isSmallScreen ? 20 : 24} color="#0D1D35" />
          </TouchableOpacity>
          {title && (
            <Text className={`${isSmallScreen ? 'text-lg' : 'text-xl'} font-inter-bold text-[#0D1D35]`}>
              {title}
            </Text>
          )}
        </View>
      ) : (
        <View className='flex-row items-center gap-x-1'>
          <TouchableOpacity onPress={toggleSidebar}>
            <Image
              source={ProfileImg}
              className={`${isSmallScreen ? 'h-12 w-12' : 'h-14 w-14'} rounded-full`}
              resizeMode='cover'
            />
          </TouchableOpacity>
          
          <View className='flex-col gap-y-1 ml-1'>
            <Text className={`${isSmallScreen ? 'text-sm' : 'text-md'} font-inter-bold pl-1`}>
              Hi, <Text>{userName}</Text>
            </Text>
            
            <View className='flex-row items-center gap-x-1'>
              <Ionicons
                name='location-sharp'
                size={isSmallScreen ? 14 : 16}
                color="#0d1d35"
              />
              <Text className={`${isSmallScreen ? 'text-xs' : 'text-md'} font-inter-bold text-gray-500`}>
                {location}
              </Text>
            </View>
          </View>
        </View>
      )}
      
      <TouchableOpacity
        className={`flex justify-center items-center ${isSmallScreen ? 'h-12 w-12' : 'h-14 w-14'} bg-gray-100 rounded-full`}
        onPress={() => handleNotification()}
      >
        <Ionicons
          name="notifications"
          size={isSmallScreen ? 22 : 25}
          color="#0d1d35"
        />
        
        {notificationCount > 0 && (
          <View className={`absolute ${isSmallScreen ? 'top-0 left-6' : 'top-1 left-7'} rounded-full bg-red-700`}>
            <Text className={`px-2 text-[#ffff] font-inter-medium ${isSmallScreen ? 'text-xs' : 'text-sm'}`}>
              {notificationCount >= 1000 ? `${Math.floor(notificationCount/1000)}k` : notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}
