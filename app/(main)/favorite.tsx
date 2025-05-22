import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '@/components/Back'
import { recommendedData } from '@/constants/data'
import NearbyCard from '@/components/property/nearByCard'
import Button from '@/components/Button'

export default function Favorite() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const handleToggleFavorite = (propertyId: string) => {
    const isRemoving = favorites.includes(propertyId);
    
    if (isRemoving) {
      // If removing, show confirmation modal first
      const property = recommendedData.find(p => p.id === propertyId);
      setSelectedProperty(property);
      setModalVisible(true);
      return;
    }
    
    // If adding to favorites, do it immediately
    setFavorites(prev => [...prev, propertyId]);
  };

  const confirmRemoveFavorite = () => {
    if (!selectedProperty) return;
    
    // Remove from favorites after confirmation
    setFavorites(prev => prev.filter(id => id !== selectedProperty.id));
    setModalVisible(false);
  };

  const handlePropertyPress = (propertyId: string) => {
    // Navigate to property details or handle the press event
    console.log(`Property ${propertyId} pressed`);
  };

  return (
    <SafeAreaView
      className='flex-1 bg-white px-5'
    >
      <View className='flex flex-row items-center justify-between'>
        <Back />

        <View className='mr-10'>
          <Text className='text-lg font-inter-medium'>Favorite</Text>
        </View>

        <View>
          
        </View>
      </View>

      <ScrollView className='mt-5'>
        <View className='flex-1 flex-row flex-wrap justify-between gap-y-5'>
          {recommendedData.map((property) => (
            <NearbyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={handleToggleFavorite}
              onPress={handlePropertyPress}
            />
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View className="flex-1 justify-end">
          <View className="bg-[#ffffff] p-4 rounded-lg items-center h-2/6">
            <Text className="text-[#0D1D35] font-inter-medium text-xl mb-4">
              Remove from favorites?
            </Text>

            {selectedProperty && (
              <NearbyCard
                key={selectedProperty.id}
                property={selectedProperty}
                isFavorite={true}
                onToggleFavorite={() => {}}
                onPress={() => {}}
              />
            )}
            
            <View className='flex-1 justify-end mb-10 mt-4'>
              <View className='flex-row justify-between item w-full h-16'>
                <Button
                  className='w-2/5'
                  variant='secondary'
                  onPress={() => setModalVisible(false)}
                >
                  <Text className='text-[#0d1d35] text-lg font-inter-medium'>Cancel</Text>
                </Button>

                <Button
                  className='w-2/5'
                  variant='primary'
                  onPress={confirmRemoveFavorite}
                >
                  <Text className='text-[#ffff] text-lg font-inter-medium'>Yes, Remove</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
