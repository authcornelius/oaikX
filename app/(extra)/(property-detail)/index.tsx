import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function PropertyDetail() {
    const { id } = useLocalSearchParams();

    console.log("ID Test", id);
  return (
    <View>
      <Text>Detail for property {id}</Text>
    </View>
  )
}