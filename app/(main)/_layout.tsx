import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,  // This hides the header completely
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "inter-medium",
          marginBottom: 20,
        },
        tabBarStyle: {
            backgroundColor: "#0d1d35",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 100,
            borderTopWidth: 0,
            borderTopColor: "transparent",
        },
        tabBarItemStyle: {
          padding: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === "discover") {
            iconName = focused ? "eye" : "eye-outline";
          } else if (route.name === "booking") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "property-posting") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "profile") {
            iconName = focused ? "person" : "person-outline";
          }
          
          // For the active tab, we'll add a small indicator
          return (
            <View>
              <Ionicons name={iconName} size={24} color={color} />
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
        name="booking"
        options={{
          title: "Bookings",
        }}
      />
      <Tabs.Screen
        name="property-posting"
        options={{
          title: "Post",
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center bg-white rounded-full h-20 w-20 bottom-0 mt-0 pt-0 absolute">
              <View className="h-16 w-16 items-center justify-center bg-[#0d1d35] rounded-full">
                <Ionicons 
                  name={focused ? "add" : "add-outline"} 
                  size={30} 
                  color="#ffffff"
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
