import React from 'react';
import { StatusBar, StatusBarProps, Platform } from 'react-native';

interface CustomStatusBarProps extends StatusBarProps {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
}

export const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor = '#0D1D35',
  barStyle = 'light-content',
  ...props
}) => {
  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      translucent={Platform.OS === 'android'}
      {...props}
    />
  );
};
