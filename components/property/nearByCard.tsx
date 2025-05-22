import React from 'react';
import { View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Image from '@/components/image/image';

interface NearbyCardProps {
  property: {
    id: string;
    image: any;
    type: string;
    rating: number;
    bedrooms: number;
    location: string;
    price: string;
    title?: string;
  };
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress: (id: string) => void;
}

const NearbyCard: React.FC<NearbyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onPress,
}) => {

  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;
  
  return (
    <View className="bg-gray-100 p-2 rounded-lg flex-row gap-x-3 w-full">
      <View className={`${isSmallDevice ? 'h-28' : ' h-32'} w-32 overflow-hidden rounded-lg`}>
        <Image
          source={property.image}
          className="w-full h-full"
          resizeMode="cover"
        />

        <View className='absolute top-2 right-2'>
          <TouchableOpacity 
            onPress={() => onToggleFavorite(property.id)}
          >
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={isSmallDevice ? 10 : 15}
              color="#e23030"
              className={`rounded-full bg-white ${isSmallDevice ? 'p-1' : 'p-2'} `}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={() => onPress(property.id)}
        className={`${isSmallDevice ? 'w-7/12' : 'w-8/12'}`}
      >
        <View>
          <View className='flex-row items-center justify-between'>
            <Text className={`${isSmallDevice ? 'text-[12px]' : 'text-sm'} font-inter-medium text-[#0D1D35] bg-white rounded-full px-3 py-1`}>
              {property.type}
            </Text>
            <View className='flex-row items-center gap-x-1'>
              <AntDesign
                name='star'
                size={isSmallDevice ? 12 : 15}
                color="#e0d622"
                className={` ${isSmallDevice ? '' : 'mb-1'}`}
              />
              <Text className={`${isSmallDevice ? 'text-[12px]' : 'text-[14px]'} font-inter-medium text-[#575758]`}>
                {property.rating}
              </Text>
            </View>
          </View>
        </View>

        <View className={`flex-col mt-1 ${Platform.OS === 'ios' ? 'gap-2' : 'gap-1'}`}>
          <Text className={`${isSmallDevice ? 'text-[12px]' : 'text-[16px]'} font-inter-bold mt-2 text-[#0D1D35] pl-1`} numberOfLines={1}>
            {property.bedrooms} Bedroom {property.type}
          </Text>
          <View className='flex-row items-center gap-x-1'>
            <Ionicons
              name='location-sharp'
              size={isSmallDevice ? 14 : 16}
              color="#6b7280"
            />
            <Text className={`${isSmallDevice ? 'text-[10px]' : ' text-sm' } font-inter-medium text-gray-500`}>
              {property.location}
            </Text>
          </View>

          <View className='flex-row items-center gap-x-1 mt-1 pl-1'>
            <Text className={`${isSmallDevice ? 'text-[12px]' : ''} font-inter-bold text-[#0D1D35]`}>
              {property.price}
            </Text>
            <Text className={`${isSmallDevice ? 'text-[10px]' : ' text-[12px]'} font-inter-medium text-gray-500'`}>
              /month
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NearbyCard;
