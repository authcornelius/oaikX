import { View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/discover/header'
import Filter from '@/components/discover/filter'
import Land from '@/assets/images/land.png'


import RecommendedCard from '@/components/property/recommendedCard';
import NearbyCard from '@/components/property/nearByCard';

import recommendedData from '@/constants/data';
import { useRouter } from 'expo-router';

export default function Discover() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const router = useRouter();
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
    <SafeAreaView
      className='flex-1 bg-white px-5'
      edges={['top', 'left', 'right']} // Don't include bottom edge
    >
      <View>
        <Header />
        <Filter />
      </View>
      
      <ScrollView 
        className='flex-1 bg-white'
        showsVerticalScrollIndicator={false}
      >
        <View className='flex-row items-center justify-around mt-3 mb-3'>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} className=''>
              <View className=' flex-1 justify-center items-center'>
                <View className='bg-gray-100 rounded-full p-3 flex justify-center items-center'>
                  <Image
                    source={category.image}
                    className='w-10 h-10'
                  />
                </View>
              </View>

              <View>
                <Text className='text-center mt-2 text-[#0D1D35] font-inter-medium'>
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* recommended property */}
        <View>
          <View className='flex-row items-center justify-between mt-5'>
            <Text className='font-inter-bold text-lg text-[#0D1D35]'>
              Recommended Property
            </Text>

            <TouchableOpacity onPress={() => handleRecommendedProperty()}>
              <Text className='text-lg font-inter-regular text-blue-500'>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View className='flex-row gap-x-10'>
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
            <Text className='font-inter-bold text-lg mt-5 text-[#0D1D35]'>
              Nearby Property
            </Text>

            <TouchableOpacity onPress={() => handleNearByProperty()}>
              <Text className='text-lg mt-5 font-inter-regular text-blue-500'>
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
  )
}