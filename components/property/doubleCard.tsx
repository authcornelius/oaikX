import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image as RNImage } from "react-native";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";

interface DoubleCardProps {
  property: {
    id: string;
    image: any;
    title: string;
    location: string;
    price: string;
    rating: number;
    type: string;
  };
  onPress?: (id: string) => void;
  cardWidth?: number;
}

const DoubleCard: React.FC<DoubleCardProps> = ({ 
  property, 
  onPress,
  cardWidth = (Dimensions.get("window").width - 60) / 2
}) => {

  const { width } = Dimensions.get('window');
  const isSmallDevice = width < 375;

  const [isFavorite, setIsFavorite] = useState(false);

  const onToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View
      style={{ width: cardWidth }}
      className="bg-gray-100 rounded-lg overflow-hidden p-2"
    >
      <View className={`${isSmallDevice ? 'h-32' : 'h-40'}`}>
        <RNImage
          source={property.image}
          className={`${isSmallDevice ? 'w-full h-32' : 'w-full h-full'} rounded-lg`}
          resizeMode="cover"
        />

        <View className="absolute top-2 right-2">
          <TouchableOpacity onPress={onToggleFavorite}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={isSmallDevice ? 15 : 20}
              color="#e23030"
              className={`rounded-full bg-white ${isSmallDevice ? 'p-1' : 'p-2'}`}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={() => onPress && onPress(property.id)}
        className='pt-3'
      >
        <View className='flex-row items-center justify-between mt-2'>
          <Text className='text-[10px] font-inter-medium text-[#0D1D35] bg-white rounded-full px-2 py-1'>
            {property.type}
          </Text>

          <View className='flex-row items-center gap-x-1'>
            <AntDesign
              name='star'
              size={isSmallDevice ? 13 : 15}
              color="#e0d622"
              className={`${isSmallDevice ? 'mb-0' : 'mb-1'}`}
            />
            <Text className={`font-inter-medium text-[#575758] ${isSmallDevice ? 'text-[10px] ' : 'text-[12px]'}`}>
              {property.rating}
            </Text>
          </View>
        </View>

        <View className='flex-col gap-2'>
          <Text className='text-[12px] font-inter-bold mt-2 text-[#0D1D35] pl-1' numberOfLines={1}>
            {property.title}
          </Text>
          <View className='flex-row items-center gap-x-1'>
            <Ionicons
              name='location-sharp'
              size={isSmallDevice ? 12 : 15}
              color="#6b7280"
            />
            <Text className={`${isSmallDevice ? 'text-[10px]' : 'text-[12px]'} font-inter-medium text-gray-500'`}>
              {property.location}
            </Text>
          </View>
          <View className={`flex-row items-center gap-x-1 mb-3 pl-1 ${isSmallDevice ? '' : 'mt-1'}`}>  
            <Text className={`${isSmallDevice ? 'text-[12px]' : 'text-[14px]'} font-inter-bold text-[#0D1D35]`}>
              {property.price}
            </Text>
            <Text className={`${isSmallDevice ? 'text-[10px]' : 'text-[12px]'} font-inter-medium text-gray-500'`}>
              /month
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DoubleCard;
