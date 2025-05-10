import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons, Octicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View className='flex-row justify-between items-center pt-1 pb-3'>
      <View>
        <Text className='text-md font-inter-bold mb-1 ml-1'>
          Hi, <Text>Cornel</Text>
        </Text>

        <View className='flex-row items-center gap-x-1'>
          <Ionicons 
            name='location-sharp'
            size={16}
            color="#0d1d35"
          />
          <Text className=' text-md font-inter-bold text-gray-500'>
            Benin City, NGA
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        className='flex justify-center items-center h-14 w-14 bg-gray-100 rounded-full'
        onPress={() => console.log('Notification')}
      >
        <Ionicons 
          name="notifications" 
          size={25}
          color="#0d1d35"
        />

        <View className='absolute top-5 right-2 ml-2 mb-5 rounded-full'>
          <Octicons
            name='dot-fill' 
            size={15}
            color="#e23030"
            className='rounded-full mt-1'
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}
