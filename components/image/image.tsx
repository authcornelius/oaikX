import React from 'react';
import { Image as RNImage, ImageProps as RNImageProps, ImageSourcePropType, StyleSheet } from 'react-native';
import { View } from 'react-native';

export interface ImageProps extends Omit<RNImageProps, 'source'> {
  source: ImageSourcePropType;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
  containerClassName?: string;
}

const Image: React.FC<ImageProps> = ({
  source,
  width = '100%',
  height = '100%',
  borderRadius = 0,
  resizeMode = 'contain',
  className = '',
  containerClassName = '',
  ...rest
}) => {
  return (
    <View className={`overflow-hidden ${containerClassName}`} style={{ width, height, borderRadius }}>
      <RNImage
        source={source}
        className={`w-full h-full ${className}`}
        resizeMode={resizeMode}
        {...rest}
      />
    </View>
  );
};

export default Image;
