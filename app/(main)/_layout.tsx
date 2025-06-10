import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Get screen dimensions for responsive calculations
const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 370;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  // Adjust tab bar height based on screen size and platform
  const tabBarHeight = Platform.OS === 'ios' 
    ? (isSmallScreen ? 80 : 100) + (insets.bottom > 0 ? 0 : 20) 
    : isSmallScreen ? 70 : 90;
  
  // Adjust icon size based on screen size
  const iconSize = isSmallScreen ? 20 : 24;
  
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,  // This hides the header completely
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: isSmallScreen ? 10 : 12,
          fontFamily: "inter-medium",
          marginBottom: isSmallScreen ? 15 : 20,
        },
        tabBarStyle: {
          backgroundColor: "#0d1d35",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: tabBarHeight,
          borderTopWidth: 0,
          borderTopColor: "transparent",
        },
        tabBarItemStyle: {
          padding: isSmallScreen ? 5 : 10,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          
          if (route.name === "discover") {
            iconName = focused ? "eye" : "eye-outline";
          } else if (route.name === "explore") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "property-posting") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "chat") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          }
          
          // For the active tab, we'll add a small indicator
          return (
            <View>
              <Ionicons 
                name={iconName} 
                size={iconSize} 
                color={color} 
              />
              
              {focused && (
                <View className="h-1 w-6 rounded-full mt-1" />
              )}
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
      <Tabs.Screen
        name="property-posting"
        options={{
          title: "Post",
          tabBarIcon: ({ focused }) => (
            <View className={`items-center justify-center bg-white rounded-full ${isSmallScreen ? 'h-16 w-16' : 'h-20 w-20'} bottom-0 mt-0 pt-0 absolute`}>
              <View className={`items-center justify-center bg-[#0d1d35] rounded-full ${isSmallScreen ? 'h-12 w-12' : 'h-16 w-16'}`}>
                <Ionicons
                  name={focused ? "add" : "add-outline"}
                  size={isSmallScreen ? 24 : 30}
                  color="#ffffff"
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />
    </Tabs>
  );
}
