import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ProfileImg from '@/assets/images/9334176.jpg'

export default function Header() {
  const router = useRouter();


  const handleNotification = () => {
    router.push('/(extra)/(notification)/notification');
  };

  return (
    <View className='flex-row justify-between items-center pt-1 pb-3'>
      <View className='flex-row items-center gap-x-1'>
        <Image 
          source={ProfileImg}
          className='h-14 w-14 rounded-full'
          resizeMode='cover'
        />
        <View className='flex-col gap-y-2'>
          <Text className='text-md font-inter-bold ml-1'>
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
      </View>

      <TouchableOpacity 
        className='flex justify-center items-center h-14 w-14 bg-gray-100 rounded-full'
        onPress={() => handleNotification()}
      >
        <Ionicons 
          name="notifications" 
          size={25}
          color="#0d1d35"
        />

        <View className='absolute top-1 left-7 mb-5 rounded-full bg-red-700'>
          {/* <Octicons
            name='dot-fill' 
            size={15}
            color="#e23030"
            className='rounded-full mt-1'
          /> */}
          <Text className='px-2 text-[#ffff] font-inter-medium'>5k</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
