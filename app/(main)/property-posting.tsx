import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PropertyPosting() {
  return (
   <SafeAreaView
      className='flex-1 bg-white px-5'
    >
        <View>
            <Text>Post Properties here</Text>
        </View>
    </SafeAreaView>
  )
}