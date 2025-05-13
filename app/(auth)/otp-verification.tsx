import { View, Text, TouchableOpacity, Platform, TextInput, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OtpVerification() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<Array<TextInput | any>>([]);
    const [error, setError] = useState(false);
    console.log("error: ", error);
    
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);

    const handlePrevious = () => {
        router.back();
    }

    const handleVerify = () => {
        const otpValue = otp.join('');
        console.log("otp :", otpValue);
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
    <SafeAreaView className='flex-1'>
        <ScrollView className={`h-screen ${Platform.OS === 'ios' ? 'px-5' : 'px-5 py-10'}`}>
            <View className='rounded-full w-14 h-14 overflow-hidden border-2 border-gray-300'>
                <TouchableOpacity
                    className='flex-1 items-center justify-center bg-gray-100' 
                    onPress={handlePrevious}
                >
                    <AntDesign 
                        name="arrowleft" 
                        size={24} 
                        color="#0d1d35" 
                    />
                </TouchableOpacity>
            </View>
    
            <View className='flex-1 items-center my-20'>
                <Text className='text-2xl font-lato-bold text-center mb-3'>
                    Enter the OTP sent to your email 
                </Text>
                <Text className='text-md text-center mt-2 text-gray-600 font-inter-regular leading-6'>
                    We have sent a 6-digit code to your email address. Please enter it below to verify your account.
                </Text>

                <View className='flex-row items-center justify-between mt-5 gap-x-3'>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <View key={index} className={`${error ? 'border-red-600' : 'border-gray-300'} border-2 rounded-2xl w-14 h-14 overflow-hidden mt-10`}>
                            <TextInput
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                className='flex-1 text-center text-2xl font-inter-medium'
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
                    className='h-14 rounded-full mt-10'
                    fullWidth={true}
                    variant='primary'
                    size='lg'
                    onPress={handleVerify}
                    disabled={otp.join('').length !== 6}
                >
                    <Text className='text-center text-[#ffff] text-xl font-lato-bold'>
                        Verify
                    </Text>
                </Button>

                <View className="flex-row mt-5">
                    <Text className="text-gray-500">Didn't receive code? </Text>
                    <TouchableOpacity>
                        <Text className="text-[#0d1d35] font-bold">Resend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView> 
    </SafeAreaView>
  )
}
