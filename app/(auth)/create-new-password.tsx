import { View, Text, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateNewPassword() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePrevious = () => {
    router.back()
  }

  const validatePassword = () => {
    if (!password) {
      setPasswordError(true)
      setPasswordErrorMessage('Please enter password')
      return false
    } else if (password.length < 8) {
      setPasswordError(true)
      setPasswordErrorMessage('Password must be at least 8 characters')
      return false
    } else {
      setPasswordError(false)
      setPasswordErrorMessage('')
      return true
    }
  }

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError(true)
      setConfirmPasswordErrorMessage('Please confirm your password')
      return false
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(true)
      setConfirmPasswordErrorMessage('Passwords do not match')
      return false
    } else {
      setConfirmPasswordError(false)
      setConfirmPasswordErrorMessage('')
      return true
    }
  }

  const handleChangePassword = () => {
    const isPasswordValid = validatePassword()
    const isConfirmPasswordValid = validateConfirmPassword()

    if (isPasswordValid && isConfirmPasswordValid) {
      setIsLoading(true)
      // Implement API call to change password here
      setTimeout(() => {
        setIsLoading(false)
        // Navigate to success screen or login
        router.replace('/(auth)/login')
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
            className='flex-1 items-center justify-center bg-gray-200' 
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
              Create New Password
            </Text>

            <Text className='text-md text-center mt-2 text-gray-600 font-inter-regular'>
              Your new password must be different from your previously used password
            </Text>
            
            <View className='mt-8 w-full gap-y-8'>
              <View>
                <Text className='text-gray-700 mb-1 font-medium'>Password</Text>
                <View className='w-full'>
                  <TextInput
                    className='h-14 w-full bg-gray-100 rounded-lg p-5'
                    placeholder='Enter your password'
                    placeholderTextColor='#999999'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onBlur={validatePassword}
                  />
                  <TouchableOpacity
                    className='absolute right-5 top-3'
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye' : 'eye-off'} 
                      size={24} 
                      color="gray" 
                    />
                  </TouchableOpacity>
                </View>

                {passwordError && (
                  <View className='mt-2 ml-1'>
                    <Text className='text-[#7e0b0b] text-[13px] font-inter-medium'>{passwordErrorMessage}</Text>
                  </View>
                )}
              </View>

              <View>
                <Text className='text-gray-700 mb-1 font-medium'>Confirm Password</Text>
                <View className='w-full'>
                  <TextInput
                    className='h-14 w-full bg-gray-100 rounded-lg p-5'
                    placeholder='Re-enter your password'
                    placeholderTextColor='#999999'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    onBlur={validateConfirmPassword}
                  />
                  <TouchableOpacity
                    className='absolute right-5 top-3'
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye' : 'eye-off'} 
                      size={24} 
                      color="gray" 
                    />
                  </TouchableOpacity>
                </View>

                {confirmPasswordError && (
                  <View className='mt-2 ml-1'>
                    <Text className='text-[#7e0b0b] text-[13px] font-inter-medium'>{confirmPasswordErrorMessage}</Text>
                  </View>
                )}
              </View>

              <View className='mt-3'>
                <Button
                  className='rounded-full p-4 shadow-sm'
                  variant='primary'
                  size='lg'
                  isLoading={isLoading}
                  onPress={handleChangePassword}
                >
                  <Text className='text-center text-[#ffff] text-xl font-lato-bold'>
                    Change Password
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
