import { View, Text, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '@/components/Back';

// Get screen dimensions for responsive calculations
const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isShortScreen = height < 700;

export default function ForgotPassword() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [contactMethod, setContactMethod] = useState('email') // 'email' or 'mobile'
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [contactError, setContactError] = useState(false)
  const [contactErrorMessage, setContactErrorMessage] = useState('')

  const handlePrevious = () => {
    router.back()
  }

  const validateContact = () => {
    if (contactMethod === 'email') {
      if (!email) {
        setContactError(true)
        setContactErrorMessage('Please enter your email')
        return false
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setContactError(true)
        setContactErrorMessage('Please enter a valid email')
        return false
      }
    } else {
      if (!mobile) {
        setContactError(true)
        setContactErrorMessage('Please enter your mobile number')
        return false
      }
      // Basic mobile validation (can be enhanced based on requirements)
      if (mobile.length < 10) {
        setContactError(true)
        setContactErrorMessage('Please enter a valid mobile number')
        return false
      }
    }
    setContactError(false)
    setContactErrorMessage('')
    return true
  }

  const handleRequestReset = () => {
    const isContactValid = validateContact()
    if (isContactValid) {
      setIsLoading(true)
      // Implement API call to request password reset here
      setTimeout(() => {
        setIsLoading(false)
        // Navigate to the separate create new password component
        router.push('/(auth)/otp-verification')
      }, 1500)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-[#ffff]'>
      <View className='px-4'>
        <View className='overflow-hidden self-start'>
          <Back/>
        </View>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className={`${Platform.OS === 'ios' ? 'px-4' : isSmallScreen ? 'px-10' : 'px-4 py-6'}`}
      >
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className={`flex-1 items-center ${isShortScreen ? 'my-0' : 'my-10'}`}
        >
          <View className='w-full max-w-sm'>
            <Text className={`${isSmallScreen ? 'text-xl' : 'text-2xl'} text-center mt-2 font-inter-bold`}>
              Reset Password
            </Text>
            
            <Text className={`${isSmallScreen ? 'text-sm' : 'text-md'} text-center mt-1 text-gray-600 font-inter-regular px-2`}>
              Enter your email or mobile number associated with your account to reset your password
            </Text>
            
            <View className={`${isSmallScreen ? 'mt-6' : 'mt-8'} w-full gap-y-4`}>
              <View className='flex-row border border-gray-300 rounded-md overflow-hidden'>
                <TouchableOpacity
                  className={`flex-1 ${isSmallScreen ? 'p-2' : 'p-3'} ${contactMethod === 'email' ? 'bg-blue-100' : 'bg-white'}`}
                  onPress={() => setContactMethod('email')}
                >
                  <Text className={`text-center ${contactMethod === 'email' ? 'font-inter-bold' : 'font-inter-regular'} ${isSmallScreen ? 'text-sm' : 'text-base'}`}>
                    Email
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className={`flex-1 ${isSmallScreen ? 'p-2' : 'p-3'} ${contactMethod === 'mobile' ? 'bg-blue-100' : 'bg-white'}`}
                  onPress={() => setContactMethod('mobile')}
                >
                  <Text className={`text-center ${contactMethod === 'mobile' ? 'font-inter-bold' : 'font-inter-regular'} ${isSmallScreen ? 'text-sm' : 'text-base'}`}>
                    Mobile
                  </Text>
                </TouchableOpacity>
              </View>
              
              {contactMethod === 'email' ? (
                <View className={`${isSmallScreen ? 'mt-3' : 'mt-4'}`}>
                  <TextInput
                    className={`${isSmallScreen ? 'h-12' : 'h-14'} w-full bg-gray-100 rounded-lg p-4`}
                    placeholder="Enter your email"
                    placeholderTextColor='#999999'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {contactError && (
                    <Text className='text-red-500 mt-1 text-sm font-inter-medium'>{contactErrorMessage}</Text>
                  )}
                </View>
              ) : (
                <View className={`${isSmallScreen ? 'mt-3' : 'mt-4'}`}>
                  <TextInput
                    className={`${isSmallScreen ? 'h-12' : 'h-14'} w-full bg-gray-100 rounded-lg p-4`}
                    placeholder="Enter your mobile number"
                    placeholderTextColor='#999999'
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                  />
                  {contactError && (
                    <Text className='text-red-500 mt-1 text-sm font-inter-medium'>{contactErrorMessage}</Text>
                  )}
                </View>
              )}
              
              <View className={`${isSmallScreen ? 'mt-4' : 'mt-6'}`}>
                <Button
                  className={`rounded-full ${isSmallScreen ? 'p-3' : 'p-4'} shadow-sm`}
                  variant='primary'
                  size='lg'
                  isLoading={isLoading}
                  onPress={handleRequestReset}
                >
                  <Text className={`text-center text-[#ffff] ${isSmallScreen ? 'text-lg' : 'text-xl'} font-lato-bold`}>
                    Send OTP
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
