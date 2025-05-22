import { View, Text, TouchableOpacity, ScrollView, Image, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Button } from '@/components/Button'

interface SideBarProps {
  onClose: () => void;
  userProfile?: {
    name: string;
    email: string;
    avatar?: any;
  };
  isClosing?: boolean;
}

export default function SideBar({ onClose, userProfile, isClosing = false }: SideBarProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Run the animation when the component mounts or when isClosing changes
  useEffect(() => {
    if (isClosing) {
      // Animate out
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate in
      slideAnim.setValue(-300);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isClosing]);

  const navigateTo = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route);
    }, 300);
  };

  return (
    <Animated.View
      className='h-screen'
      style={{
        width: '100%',
        transform: [{ translateX: slideAnim }],
      }}
    >
      <View className='h-full w-full bg-white shadow-lg'>
        <View className="p-4 flex-row justify-between items-center border-b border-gray-200">
          <Text className="text-lg font-inter-bold text-[#0d1d35]">Menu</Text>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" size={24} color="#0d1d35" />
          </TouchableOpacity>
        </View>
        
        <ScrollView>
          {/* User profile section */}
          {userProfile && (
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row items-center">
                <Image
                  source={userProfile.avatar}
                  className="w-16 h-16 rounded-full"
                />
                <View className="ml-3">
                  <Text className="text-lg font-inter-bold text-[#0D1D35]">{userProfile.name}</Text>
                  <Text className="text-sm font-inter-regular text-gray-500">{userProfile.email}</Text>
                </View>
              </View>
            </View>
          )}
          
          {/* Menu items */}
          <View className="p-4">
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => navigateTo('/profile')}
            >
              <FontAwesome name="user" size={20} color="#0D1D35" />
              <Text className="ml-4 text-base font-inter-medium text-[#0D1D35]">Profile</Text>
            </TouchableOpacity>
            
            {/* Other menu items remain the same */}
            {/* ... */}
            
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => navigateTo('/favorites')}
            >
              <FontAwesome name="heart" size={20} color="#0D1D35" />
              <Text className="ml-4 text-base font-inter-medium text-[#0D1D35]">Favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => navigateTo('/(extra)/(notification)/notification')}
            >
              <Ionicons name="notifications" size={20} color="#0D1D35" />
              <Text className="ml-4 text-base font-inter-medium text-[#0D1D35]">Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => navigateTo('/messages')}
            >
              <FontAwesome name="envelope" size={20} color="#0D1D35" />
              <Text className="ml-4 text-base font-inter-medium text-[#0D1D35]">Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => navigateTo('/settings')}
            >
              <FontAwesome name="cog" size={20} color="#0D1D35" />
              <Text className="ml-4 text-base font-inter-medium text-[#0D1D35]">Settings</Text>
            </TouchableOpacity>
            
            <View className="border-t border-gray-200 my-2" />
            
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => navigateTo('/help')}
            >
              <FontAwesome name="question-circle" size={20} color="#0D1D35" />
              <Text className="ml-4 text-base font-inter-medium text-[#0D1D35]">Help & Support</Text>
            </TouchableOpacity>
            
            <View className="mt-4">
              <Button
                variant="primary"
                onPress={() => navigateTo('/logout')}
                leftIcon={<FontAwesome name="sign-out" size={18} color="white" />}
              >
                Logout
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </Animated.View>
  );
}
