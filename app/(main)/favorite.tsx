import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import Back from '@/components/Back'

export default function Favorite() {
  return (
    <SafeAreaView
      className='flex-1 bg-white px-5'
    >
      <View className='flex flex-row items-center justify-between'>
        <Back />

        <Text className='text-lg font-inter-medium'>Favorite</Text>

        <View className='rounded-full w-14 h-14 overflow-hidden border-2 border-gray-300'>
          <TouchableOpacity 
            className='flex-1 items-center justify-center bg-gray-100'
            // onPress={handleBack}
          >
            <Feather   
              name='search'
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className='mt-3'>
        <Text className='text-lg font-inter-medium'>Nearby Property</Text>
      </ScrollView>
    </SafeAreaView>
  )
}