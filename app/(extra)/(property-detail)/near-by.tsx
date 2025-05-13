import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '@/components/Back'

export default function NearBy() {
  return (
    <SafeAreaView
      className='flex-1 bg-white px-5'
    >
      <View className='flex flex-row items-center justify-between'>
        <Back />

        <Text className='text-lg font-inter-medium'>Nearby Property</Text>

        <View className=''>

        </View>
      </View>

      <ScrollView className='mt-3'>
        <Text className='text-lg font-inter-medium'>Nearby Property</Text>
      </ScrollView>
    </SafeAreaView>
  )
}