import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import SideBar from "@/components/discover/sideBar/side-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    LatoBold: require('../assets/fonts/Lato-Bold.ttf'),
    InterBold: require('../assets/fonts/Inter_24pt-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter_18pt-Medium.ttf'),
    InterRegular: require('../assets/fonts/Inter_18pt-Regular.ttf'),
    InterItalic: require('../assets/fonts/Inter_18pt-Italic.ttf'),
  });

  // Sidebar state and animation
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimating, setSidebarAnimating] = useState(false);
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
  });

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const sidebarWidth = dimensions.window.width * 0.8;

  // Handle screen dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  }, []);

  // Handle sidebar animation
  useEffect(() => {
    if (sidebarVisible) {
      // Opening animation
      setSidebarAnimating(true);
      Animated.timing(slideAnim, {
        toValue: sidebarWidth,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setSidebarAnimating(false);
      });
    } else if (sidebarAnimating) {
      // Closing animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setSidebarAnimating(false);
      });
    }
  }, [sidebarVisible, sidebarWidth]);

  const toggleSidebar = () => {
    if (!sidebarVisible && !sidebarAnimating) {
      // Opening
      setSidebarVisible(true);
    } else if (sidebarVisible && !sidebarAnimating) {
      // Closing
      setSidebarAnimating(true);
      setSidebarVisible(false);
    }
  };

  const handleCloseSidebar = () => {
    if (sidebarVisible && !sidebarAnimating) {
      setSidebarAnimating(true);
      setSidebarVisible(false);
    }
  };

  // Expose the toggleSidebar function globally
  global.toggleSidebar = toggleSidebar;

  // User profile data for sidebar
  const userProfile = {
    name: "Cornel",
    email: "cornel@example.com",
    avatar: require("@/assets/images/9334176.jpg"),
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Sidebar - show during visible state or while animating */}
      {(sidebarVisible || sidebarAnimating) && (
        <View
          className="absolute top-0 left-0 h-full z-50"
          style={{ width: sidebarWidth }}
        >
          <SideBar 
            onClose={handleCloseSidebar} 
            userProfile={userProfile}
            isClosing={!sidebarVisible && sidebarAnimating}
          />
        </View>
      )}

      {/* Main content with push effect */}
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: slideAnim }],
        }}
      >
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="(extra)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        
        <StatusBar style="auto" />
      </Animated.View>

      {/* Overlay to close sidebar when tapped */}
      {(sidebarVisible || sidebarAnimating) && (
        <TouchableOpacity
          className="absolute top-0 right-0 h-full"
          style={{ width: dimensions.window.width - sidebarWidth }}
          onPress={handleCloseSidebar}
          activeOpacity={1}
        />
      )}
    </View>
  );
}
