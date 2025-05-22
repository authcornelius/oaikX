import { View, Text, TouchableOpacity, Platform, TextInput, ScrollView, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '@/components/Back';

// Get screen dimensions for responsive calculations
const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isShortScreen = height < 700;

export default function OtpVerification() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<Array<TextInput | any>>([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);


    const handleVerify = () => {
        const otpValue = otp.join('');
        console.log("otp :", otpValue);
        // Add your verification logic here
    }

    const handleOtpChange = (text: string, index: number) => {
        // Allow only numbers
        if (/^[0-9]?$/.test(text)) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            // Auto focus to next input if a digit is entered
            if (text && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        // Handle backspace
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
           <View className='px-4'>
                <View className='overflow-hidden self-start'>
                    <Back/>
                </View>
            </View>
            <ScrollView 
                className={`${Platform.OS === 'ios' ? 'px-4' : isSmallScreen ? 'px-10' : 'px-4 py-6'}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >  
                <View className={`flex-1 items-center ${isShortScreen ? 'my-5' : 'mt-10'}`}>
                    <Text className={`${isSmallScreen ? 'text-xl' : 'text-2xl'} font-lato-bold text-center mb-2`}>
                        Enter the OTP sent to your email
                    </Text>
                    
                    <Text className={`${isSmallScreen ? 'text-sm' : 'text-md'} text-center mt-1 text-gray-600 font-inter-regular leading-6 px-4`}>
                        We have sent a 6-digit code to your email address. Please enter it below to verify your account.
                    </Text>
                    
                    <View className={`flex-row items-center justify-between ${isSmallScreen ? 'mt-3 gap-x-2' : 'mt-5 gap-x-3'}`}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <View 
                                key={index} 
                                className={`${error ? 'border-red-600' : 'border-gray-300'} border-2 rounded-2xl 
                                ${isSmallScreen ? 'w-12 h-12' : 'w-14 h-14'} overflow-hidden ${isShortScreen ? 'mt-3' : 'mt-10'}`}
                            >
                                <TextInput
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    className={`flex-1 text-center ${isSmallScreen ? 'text-sm' : 'text-2xl'} font-inter-medium`}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={otp[index]}
                                    onChangeText={(text) => handleOtpChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    selectionColor="#0d1d35"
                                    autoFocus={index === 0}
                                    onBlur={() => {
                                        // Check if all OTP fields are filled
                                        const otpValue = otp.join('');
                                        if (otpValue.length < 6) {
                                            setError(true);
                                            setErrorMessage('Please enter a complete 6-digit OTP');
                                        } else {
                                            setError(false);
                                            setErrorMessage('');
                                        }
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                    
                    {error && (
                        <Text className='text-red-500 mt-2 font-inter-medium'>{errorMessage}</Text>
                    )}
                    
                    <Button
                        className={`${isSmallScreen ? 'h-12' : 'h-14'} rounded-full ${isShortScreen ? 'mt-6' : 'mt-10'}`}
                        fullWidth={true}
                        variant='primary'
                        size='lg'
                        onPress={handleVerify}
                        disabled={otp.join('').length !== 6}
                    >
                        <Text className={`text-center text-[#ffff] ${isSmallScreen ? 'text-lg' : 'text-xl'} font-lato-bold`}>
                            Verify
                        </Text>
                    </Button>
                    
                    <View className="flex-row mt-5">
                        <Text className={`text-gray-500 ${isSmallScreen ? 'text-sm' : 'text-base'}`}>Didn't receive code? </Text>
                        <TouchableOpacity>
                            <Text className={`text-[#0d1d35] font-bold ${isSmallScreen ? 'text-sm' : 'text-base'}`}>Resend</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
