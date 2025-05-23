import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '@/components/Back'
import DoubleCard from '@/components/property/doubleCard'
import { recommendedData } from "@/constants/data";
import { useRouter } from 'expo-router'

export default function NearBy() {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 60) / 2; // 60 accounts for padding and gap
  const router = useRouter();

  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  
  // Define categories for nearby properties
  const categories = ['all', 'office', 'home', 'hotel', 'apartment', 'event center'];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Here you would typically filter properties based on the selected category
  };

  const handlePropertyPress = (id: string) => {
    // Handle property press, e.g., navigate to property detail
    console.log(`Property ${id} pressed`);
    router.push(`/(extra)/(property-detail)/?id=${id}`);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <View className="flex flex-row items-center justify-between">
        <Back />
        <Text className="text-lg font-inter-medium">Nearby Property</Text>
        <View className=""></View>
      </View>

      <View className='my-5'>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <View className='flex-row items-center gap-x-3'>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category}
                onPress={() => handleCategorySelect(category)}
              >
                <Text 
                  className={`font-inter-medium px-4 py-2 rounded-xl 
                      ${
                      selectedCategory === category 
                        ? 'bg-[#0D1D35] text-white' 
                        : 'bg-gray-100 text-[#0D1D35]'
                    }
                    ${isSmallDevice ? 'text-sm' : 'text-base'}
                  `}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="flex-1 flex-row flex-wrap justify-between gap-y-5">
          {recommendedData.map((property) => (
            <DoubleCard
              key={property.id}
              property={property}
              onPress={handlePropertyPress}
              cardWidth={cardWidth}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
