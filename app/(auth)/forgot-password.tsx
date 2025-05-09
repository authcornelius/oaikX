import { View, Text, SafeAreaView, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';

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
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1 }}
        className={`h-screen ${Platform.OS === 'ios' ? 'px-5' : 'px-5 py-10'}`}
      >
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

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1 items-center my-10'
        >
          <View className='w-full max-w-sm'>
            <Text className='text-2xl text-center mt-4 font-inter-bold'>
              Reset Password
            </Text>

            <Text className='text-md text-center mt-2 text-gray-600 font-inter-regular'>
              Enter your email or mobile number associated with your account to reset your password
            </Text>
            
            <View className='mt-8 w-full gap-y-4'>
              <View className='flex-row border border-gray-300 rounded-md overflow-hidden'>
                <TouchableOpacity 
                  className={`flex-1 p-3 ${contactMethod === 'email' ? 'bg-blue-100' : 'bg-white'}`}
                  onPress={() => setContactMethod('email')}
                >
                  <Text className={`text-center ${contactMethod === 'email' ? 'font-inter-bold' : 'font-inter-regular'}`}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className={`flex-1 p-3 ${contactMethod === 'mobile' ? 'bg-blue-100' : 'bg-white'}`}
                  onPress={() => setContactMethod('mobile')}
                >
                  <Text className={`text-center ${contactMethod === 'mobile' ? 'font-inter-bold' : 'font-inter-regular'}`}>Mobile</Text>
                </TouchableOpacity>
              </View>

              {contactMethod === 'email' ? (
                <View className='mt-4'>
                  <TextInput
                    className="h-14 w-full bg-gray-100 rounded-lg p-5"
                    placeholder="Enter your email"
                    placeholderTextColor='#999999'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {contactError && (
                    <Text className='text-red-500 mt-1'>{contactErrorMessage}</Text>
                  )}
                </View>
              ) : (
                <View className='mt-4'>
                  <TextInput
                    className="h-14 w-full bg-gray-100 rounded-lg p-5"
                    placeholder="Enter your mobile number"
                    placeholderTextColor='#999999'
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                  />
                  {contactError && (
                    <Text className='text-red-500 mt-1'>{contactErrorMessage}</Text>
                  )}
                </View>
              )}

              <View className='mt-6'>
                <Button
                  className='rounded-full p-4 shadow-sm'
                  variant='primary'
                  size='lg'
                  isLoading={isLoading}
                  onPress={handleRequestReset}
                >
                  <Text className='text-center text-[#ffff] text-xl font-lato-bold'>
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
