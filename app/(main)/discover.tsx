import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/discover/header'
import Filter from '@/components/discover/filter'
import Land from '@/assets/images/land.png'
import Image1 from '@/assets/properties/three-bedroom-apartmnet-union-market-noho-washington-dc-luxury.jpeg'

export default function Discover() {

  const [ addFavorites, setAddFavorites ] = useState(false);

  const categories = [
    { id: '1', name: 'Land', image: Land },
    { id: '2', name: 'Home', image: Land },
    { id: '3', name: 'Apartment', image: Land },
    { id: '4', name: 'Hotel', image: Land },
  ]
  return (
    <SafeAreaView
      className='flex-1 bg-white px-5'
      edges={['top', 'left', 'right']} // Don't include bottom edge
    >
      <View>
        <Header />

        <Filter />
      </View>
      
      <ScrollView 
        className='flex-1 bg-white '
      >
        <View className='flex-row items-center justify-around mt-3 mb-3'>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} className=''>
              <View className=' flex-1 justify-center items-center'>
                <View className='bg-gray-100 rounded-full p-3 flex justify-center items-center'>
                  <Image
                    source={category.image}
                    className='w-10 h-10'
                  />
                </View>
              </View>

              <View>
                <Text className='text-center mt-2 text-[#0D1D35] font-inter-medium'>
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* recommended property */}
        <View>
          <View className='flex-row items-center justify-between'>
            <Text className='font-inter-bold text-lg mt-5 text-[#0D1D35]'>
              Recommended Property
            </Text>

            <TouchableOpacity>
              <Text className='text-lg mt-5 font-inter-regular text-blue-500'>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <View className='w-60 p-2 bg-gray-100 rounded-lg mt-5 shadow-[1px_1px_3px_3px_rgba(0,0,0,0.1)]'>
              <View>
                <Image 
                  source={Image1}
                  className='w-56 h-40 rounded-lg'
                />

                <View className='absolute top-3 right-5'>
                  {addFavorites === true ? (
                    <TouchableOpacity onPress={() => setAddFavorites(false)}>
                      <FontAwesome
                        name='heart'
                        size={20}
                        color="#e23030"
                        className='rounded-full bg-white p-2'
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setAddFavorites(true)}>
                      <FontAwesome
                        name='heart-o'
                        size={20}
                        color="#e23030"
                        className='rounded-full bg-white p-2'
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View>
                  <Text className='text-lg font-inter-bold mt-2 text-[#0D1D35]'>
                      3 Bedroom Apartment
                      <Text className='text-sm font-inter-regular text-[#0D1D35]'>
                        Union Market, Noho, Washington DC
                      </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}