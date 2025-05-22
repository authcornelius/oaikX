import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

interface RecommendedCardProps {
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
  horizontal?: boolean;
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onPress,
  horizontal = true
}) => {

  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  return (
    <View
      key={property.id}
      className={`${isSmallDevice ? 'w-48' : horizontal ? 'w-60' : 'w-full'} p-2 bg-gray-100 rounded-lg mt-5 shadow-[1px_1px_3px_3px_rgba(0,0,0,0.1)]`}
    >
      <View>
        <Image
          source={property.image}
          className={`${isSmallDevice ? 'w-44 h-28' : horizontal ? 'w-56 h-40' : 'w-full h-40'} rounded-lg`}
        />
        <View className={`absolute ${isSmallDevice ? ' top-2 right-3' : ' top-3 right-5'}`}>
          <TouchableOpacity onPress={() => onToggleFavorite(property.id)}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={isSmallDevice ? 15 : 20}
              color="#e23030"
              className={`${isSmallDevice ? 'p-1' : 'p-2'} rounded-full bg-white`}
            />

          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => onPress(property.id)}>
        <View>
          <View className='flex-row items-center justify-between mt-2'>
            <Text className={`${isSmallDevice ? 'text-[12px]' : 'text-sm'} font-inter-medium text-[#0D1D35] bg-white rounded-full px-3 py-1`}>
              {property.type}
            </Text>
            <View className='flex-row items-center gap-x-1'>
              <AntDesign
                name='star'
                size={15}
                color="#e0d622"
                className='mb-1'
              />
              <Text className={`${isSmallDevice ? 'text-[12px]' : 'text-sm'} font-inter-medium text-[#575758]`}>
                {property.rating}
              </Text>
            </View>
          </View>
        </View>

        <View className='flex-col gap-2'>
          <Text className={`${isSmallDevice ? 'text-[12px]' : 'text-lg'} font-inter-bold mt-2 text-[#0D1D35] pl-1`} numberOfLines={1}>
            {property.bedrooms} Bedroom {property.type}
          </Text>
          <View className='flex-row items-center gap-x-1'>
            <Ionicons
              name='location-sharp'
              size={16}
              color="#6b7280"
            />
            <Text className={`${isSmallDevice ? 'text-[12px]' : ' text-sm'} font-inter-medium text-gray-500`}>
              {property.location}
            </Text>
          </View>
          <View className='flex-row items-center gap-x-1 mt-1 mb-3 pl-1'>
            <Text className={`${isSmallDevice ? 'text-[12px]' : ''} font-inter-bold text-[#0D1D35]`}>
              {property.price}
            </Text>
            <Text className={`font-inter-medium text-gray-500 ${isSmallDevice ? 'text-[10px] ' : 'text-[12px] '}`}> 
              /month
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecommendedCard;
