import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '@/components/Back'

export default function Transactions() {
  return (
    <SafeAreaView
      className='flex-1 bg-white px-5'
    >
      <View className='flex flex-row items-center justify-between'>
        <Back />

        <View className='mr-10'>
          <Text className='text-lg font-inter-medium'>Transactions</Text>
        </View>

        <View>
          
        </View>
      </View>
    </SafeAreaView>
  )
}