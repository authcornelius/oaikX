import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export default function Back() {
    const router = useRouter();
    const pathname = usePathname();
    
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
        <View className='rounded-full w-14 h-14 overflow-hidden border-2 border-gray-300'>
            <TouchableOpacity 
                className='flex-1 items-center justify-center bg-gray-100'
                onPress={handleBack}
            >
                <AntDesign
                    name="arrowleft" 
                    size={24} 
                    color="#0d1d35" 
                />
            </TouchableOpacity>
        </View>
    )
}
