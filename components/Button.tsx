import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled = false,
  onPress,
  children,
}) => {
  // Base styles
  let buttonClasses = 'flex flex-row items-center justify-center rounded-md';
  let textClasses = 'font-medium';
  
  // Variant styles
  switch (variant) {
    case 'primary':
      buttonClasses += ' bg-[#0d1d35] active:bg-[#0d1d35]';
      textClasses += ' text-white';
      break;
    case 'secondary':
      buttonClasses += ' bg-gray-200 active:bg-gray-300';
      textClasses += ' text-gray-900';
      break;
    case 'outline':
      buttonClasses += ' border border-gray-300 bg-transparent active:bg-gray-50';
      textClasses += ' text-gray-900';
      break;
    case 'ghost':
      buttonClasses += ' bg-transparent active:bg-gray-100';
      textClasses += ' text-gray-900';
      break;
    case 'link':
      buttonClasses += ' bg-transparent p-0';
      textClasses += ' text-blue-600';
      break;
  }
  
  // Size styles
  switch (size) {
    case 'sm':
      buttonClasses += ' px-3 py-1.5';
      textClasses += ' text-sm';
      break;
    case 'md':
      buttonClasses += ' px-4 py-2';
      textClasses += ' text-base';
      break;
    case 'lg':
      buttonClasses += ' px-6 py-3';
      textClasses += ' text-lg';
      break;
  }
  
  // Additional styles
  if (disabled) {
    buttonClasses += ' opacity-50';
  }
  
  if (fullWidth) {
    buttonClasses += ' w-full';
  }
  
  // Add custom classes
  buttonClasses += ` ${className}`;

  return (
    <TouchableOpacity
      className={buttonClasses}
      disabled={disabled || isLoading}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : '#4B5563'} 
        />
      ) : (
        <>
          {leftIcon && (
            <View className="mr-2">
              {leftIcon}
            </View>
          )}
          
          {typeof children === 'string' ? (
            <Text className={textClasses}>
              {children}
            </Text>
          ) : (
            children
          )}
          
          {rightIcon && (
            <View className="ml-2">
              {rightIcon}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
