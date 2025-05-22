import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Filter from '@/components/discover/filter'
import Header from '@/components/discover/header';
import Land from '@/assets/images/land.png'
import RecommendedCard from '@/components/property/recommendedCard';
import NearbyCard from '@/components/property/nearByCard';
import recommendedData from '@/constants/data';
import { useRouter } from 'expo-router';

export default function Discover() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen')
  });
  const router = useRouter();
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const sidebarWidth = dimensions.window.width * 0.8;
  
  // Handle screen dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window, screen}) => {
      setDimensions({window, screen});
    });
    return () => subscription?.remove();
  }, []);

  // Handle sidebar animation
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: sidebarVisible ? sidebarWidth : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [sidebarVisible, sidebarWidth]);

  // Calculate responsive values based on screen width
  const screenWidth = dimensions.window.width;
  const isSmallDevice = screenWidth < 375;
  const isMediumDevice = screenWidth >= 375 && screenWidth < 768;
  const isLargeDevice = screenWidth >= 768;
  
  // Responsive padding based on device size
  const containerPadding = isSmallDevice ? 'px-3' : isMediumDevice ? 'px-5' : 'px-8';
  
  // Responsive category layout
  const categoryItemWidth = isSmallDevice ? 
    (screenWidth - 30) / 4 : 
    isMediumDevice ? 
      (screenWidth - 40) / 4 : 
      (screenWidth - 64) / 6;
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSidebar = () => {
    if (global.toggleSidebar) {
      global.toggleSidebar();
    }
  };

  const categories = [
    { id: '1', name: 'Land', image: Land },
    { id: '2', name: 'Apartment', image: Land },
    { id: '3', name: 'Event Center', image: Land },
    { id: '4', name: 'Hotel', image: Land },
  ]

  const handlePropertyDetails = (id: string) => {
    // router.push(`/property/${id}`);
    console.log(`Property ID: ${id}`);
  };
  
  const onToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };

  const handleRecommendedProperty = () => {
    router.push(`/(property-detail)/recommended`);
  };

  const handleNearByProperty = () => {
    router.push(`/(property-detail)/near-by`);
  };

  return (
    <View className="flex-1">
      
      {/* Main content with push effect */}
      <Animated.View 
        className="flex-1"
        style={{ 
          transform: [{ translateX: slideAnim }],
        }}
      >
        <SafeAreaView
          className={`flex-1 bg-white ${containerPadding}`}
          edges={['top', 'left', 'right']} // Don't include bottom edge
        >
          <View>
            <Header 

              onAvatarPress={toggleSidebar} 
            />
            <Filter />
          </View>
          
          <ScrollView
            className='flex-1 bg-white'
            showsVerticalScrollIndicator={false}
          >
            <View className={`flex-row flex-wrap justify-between mt-3 ${isLargeDevice ? 'px-4' : ''}`}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={{ width: categoryItemWidth }}
                  className='mb-3'
                >
                  <View className='flex-1 justify-center items-center'>
                    <View className='bg-gray-100 rounded-full p-3 flex justify-center items-center'>
                      <Image
                        source={category.image}
                        className={`${isSmallDevice ? 'w-8 h-8' : 'w-10 h-10'}`}
                      />
                    </View>
                  </View>
                  <View>
                    <Text className={`text-center mt-2 text-[#0D1D35] font-inter-medium ${isSmallDevice ? 'text-xs' : 'text-sm'}`}>
                      {category.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* recommended property */}
            <View>
              <View className='flex-row items-center justify-between mt-5'>
                <Text className={`font-inter-bold text-[#0D1D35] ${isSmallDevice ? 'text-sm' : 'text-lg'}`}>
                  Recommended Property
                </Text>
                <TouchableOpacity onPress={() => handleRecommendedProperty()}>
                  <Text className={`font-inter-regular text-blue-500 ${isSmallDevice ? 'text-base' : 'text-lg'}`}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
              >
                <View className='flex-row gap-x-4'>
                  {/* RecommendedCard */}
                  {recommendedData.map((property) => (
                    <RecommendedCard
                      key={property.id}
                      property={property}
                      isFavorite={!!favorites[property.id]}
                      onToggleFavorite={toggleFavorite}
                      onPress={handlePropertyDetails}
                      horizontal={true}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* nearby property */}
            <View>
              <View className='flex-row items-center justify-between mb-5'>
                <Text className={`font-inter-bold mt-5 text-[#0D1D35] ${isSmallDevice ? 'text-sm' : 'text-lg'}`}>
                  Nearby Property
                </Text>
                <TouchableOpacity onPress={() => handleNearByProperty()}>
                  <Text className={`mt-5 font-inter-regular text-blue-500 ${isSmallDevice ? 'text-base' : 'text-lg'}`}>
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mb-4 flex-col gap-y-3">
                {recommendedData.map(property => (
                  <NearbyCard
                    key={property.id}
                    property={property}
                    isFavorite={!!favorites[property.id]}
                    onToggleFavorite={toggleFavorite}
                    onPress={handlePropertyDetails}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
      
      {/* Overlay to close sidebar when tapped */}
      {sidebarVisible && (
        <TouchableOpacity 
          className="absolute top-0 right-0 h-full bg-black/30"
          style={{ width: dimensions.window.width - sidebarWidth }}
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}
    </View>
  )
}
