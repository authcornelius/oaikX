import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Chat() {
  return (
   <SafeAreaView
        className='flex-1 bg-white px-5'
    >
        <View>
            <Text>Chat</Text>
        </View>
    </SafeAreaView>
  )
}