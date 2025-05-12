import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Back from '@/components/Back'

export default function Notification() {
  return (
    <SafeAreaView
        className='flex-1 bg-white px-5'
    >
        <View>
            <Back />
            <Text>Notification</Text>
        </View>
    </SafeAreaView>
  )
}