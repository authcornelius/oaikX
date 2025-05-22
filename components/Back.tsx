import { View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export default function Back() {
    const router = useRouter();
    const pathname = usePathname();

    const { width } = Dimensions.get('window');
    const isSmallDevice = width < 375;
    
    const handleBack = () => {
        // Check if we're on the home screen or root
        if (pathname === '/' || pathname === '/index') {
            // Navigate to a specific screen instead of going back
            router.push('/discover');
        } else {
            router.back();
        }
    };

    return (
        <View className='h-14 overflow-hidden'>
            <TouchableOpacity 
                className='flex-1 items-center justify-center'
                onPress={handleBack}
            >
                <AntDesign
                    name="left"
                    size={isSmallDevice ? 18 : 24}
                    color="#0d1d35" 
                />
            </TouchableOpacity>
        </View>
    )
}
