import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ImageSourcePropType } from 'react-native';

interface CategoryItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

interface CategoryListProps {
  categories: CategoryItem[];
  onCategoryPress?: (id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryPress }) => {
  // Calculate responsive values based on screen width
  const screenWidth = Dimensions.get('window').width;
  const isSmallDevice = screenWidth < 375;
  const isMediumDevice = screenWidth >= 375 && screenWidth < 768;
  const isLargeDevice = screenWidth >= 768;
  
  // Responsive category layout
  const categoryItemWidth = isSmallDevice ? 
    (screenWidth - 30) / 4 : 
    isMediumDevice ? 
      (screenWidth - 40) / 4 : 
      (screenWidth - 64) / 6;

  return (
    <View className={`flex-row flex-wrap justify-between mt-3 ${isLargeDevice ? 'px-4' : ''}`}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={{ width: categoryItemWidth }}
          className='mb-3'
          onPress={() => onCategoryPress && onCategoryPress(category.id)}
        >
          <View className='flex-1 justify-center items-center'>
            <View className='bg-gray-100 rounded-full p-3 flex justify-center items-center'>
              <Image
                source={category.image}
                className={`${isSmallDevice ? 'w-8 h-8' : 'w-10 h-10'}`}
              />
            </View>
          </View>
          <View>
            <Text className={`text-center mt-2 text-[#0D1D35] font-inter-medium ${isSmallDevice ? 'text-xs' : 'text-sm'}`}>
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryList;
