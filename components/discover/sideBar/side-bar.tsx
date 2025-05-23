import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import MenuItem from "./menu";
import { sideBarMenuList } from "./menuList";

interface SideBarProps {
  onClose: () => void;
  userProfile?: {
    name: string;
    email: string;
    avatar?: any;
  };
  isClosing?: boolean;
}

export default function SideBar({
  onClose,
  userProfile,
  isClosing = false,
}: SideBarProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

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

  const handleLogout = () => {
    // Handle logout logic here
    // For now, we'll just close the sidebar
    onClose();
    router.replace('/(auth)/login');
  };


  const handleSideBarItemPress = (route: string) => () => {
    onClose();
    router.push(route);
  };


  return (
    <Animated.View
      className="h-screen"
      style={{
        width: "100%",
        transform: [{ translateX: slideAnim }],
      }}
    >
      <SafeAreaView className={`h-full w-full bg-white shadow-lg flex-1`}>
        {/* User profile section */}
        <View className={`border-b border-gray-200 ${Platform.OS === 'android' ? 'mt-7' : ''}`}>
          {userProfile && (
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row items-center">
                <Image
                  source={userProfile.avatar}
                  className={`rounded-full ${isSmallDevice ? 'w-14 h-14' : 'w-16 h-16 '}`}  
                />
                <View className="ml-3">
                  <Text className={`${isSmallDevice ? 'text-lg' : 'text-xl'}  font-inter-bold text-[#0D1D35]`}>
                    {userProfile.name}
                  </Text>
                  <Text 
                    className={`font-inter-regular text-gray-500 ${isSmallDevice ? 'text-base' : 'text-lg'}`}
                  >  
                    {userProfile.email}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <ScrollView>
          {/* Menu items */}
           <View className="p-4">
            {sideBarMenuList.map((item, index) => (
              <React.Fragment key={item.id}>
                <MenuItem
                  icon={item.icon}
                  label={item.label}
                  // onPress={() => navigateTo(item.route)}
                  onPress={handleSideBarItemPress(item.route)}
                />
                {item.id === "settings" && (
                  <View className="border-t border-gray-200 my-2" />
                )}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity className={`${isSmallDevice ? 'p-2' : 'p-4'}`}> 
          <Text className={`font-inter-bold text-center text-[#0D1D35] ${isSmallDevice ? 'text-base' : 'text-lg'}`}>  
            Verify now
          </Text>
        </TouchableOpacity>

        {/* Logout button */}
        <View className="border-t border-gray-200 p-4">
          <Button
            variant="primary"
            className="w-full h-14 rounded-lg"
            onPress={handleLogout}
            leftIcon={
              <FontAwesome 
                name="sign-out" 
                size={isSmallDevice ? 18 : 24} 
                color="white" 
              />
            }
          >
            <Text className={`font-inter-medium text-white ${isSmallDevice ? 'text-base' : 'text-lg'}`}>  
              Logout
            </Text>
          </Button>
        </View>        
      </SafeAreaView>
    </Animated.View>
  );
}
