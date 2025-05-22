import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { AntDesign, EvilIcons, FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';
import GoogleIcon from '../../assets/images/icons8-google-48.png'
import { Image } from 'react-native';
import Button from '@/components/Button';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get screen dimensions for responsive calculations
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // input validation error state
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const router = useRouter();
  
  // Define social login options
  const socialLoginOptions = [
    {
      id: 'apple',
      icon: () => <AntDesign name='apple1' size={isSmallScreen ? 20 : 24} color='#0d1d35' />,
    },
    {
      id: 'google',
      icon: () => (
        <Image
          source={GoogleIcon}
          style={{ width: isSmallScreen ? 20 : 25, height: isSmallScreen ? 20 : 25 }}
          resizeMode='contain'
        />
      ),
    },
    {
      id: 'facebook',
      icon: () => <Fontisto name='facebook' size={isSmallScreen ? 20 : 24} color='#1877F2' />,
    },
  ];

  // Add this function inside your Login component
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleLogin = () => {
    let isValid = true;
    
    // Email validation
    if (email === '') {
      setEmailError(true);
      setEmailErrorMessage('Please enter email');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    
    // Password validation
    if (password === '') {
      setPasswordError(true);
      setPasswordErrorMessage('Please enter password');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    
    // If all validations pass, proceed with login
    if (isValid) {
      console.log('Login attempt with:', email, password);
      // Uncomment to navigate to home after successful validation
      router.push('/(main)/discover');
    }
  };
  

  const handleSignUp = () => {
    router.push('/(onboarding)');
  };

  const handleForgetPassword = () => {
    router.push('/(auth)/forgot-password')
  }

  // Render each social login button
  const renderSocialButton = ({ item }) => (
    <TouchableOpacity 
      className={`border-2 border-gray-300 rounded-full ${isSmallScreen ? 'w-12 h-12' : 'w-16 h-16'} items-center justify-center`}
      onPress={() => console.log(`Login with ${item.id}`)}
    >
      {item.icon()}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1 bg-[#ffff]'>
      <ScrollView
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1 }}
        className={`${Platform.OS  === 'ios' ? 'px-4' : isSmallScreen ? 'px-10' : 'px-4 py-6'}`}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1 items-center justify-center'
        >
          <View className='w-full max-w-sm'>
            <Text className={`${isSmallScreen ? 'text-xl' : 'text-2xl'} text-center mt-2 font-inter-bold`}>
              Sign In
            </Text>

            <Text className={`${isSmallScreen ? 'text-sm' : 'text-md'} text-center mt-1 text-gray-600 font-inter-regular`}>
              Hi! Welcome back, you've been missed
            </Text>
            
            <View className={`${isSmallScreen ? 'mt-6' : 'mt-8'} w-full`}>
              <View className={`${isSmallScreen ? 'mb-5' : 'mb-7'}`}>
                <Text className='w-full text-gray-700 mb-1 font-inter-medium'>Email</Text>
                <TextInput
                  className={`${isSmallScreen ? 'h-12' : 'h-14'} w-full bg-gray-100 rounded-lg p-4`}
                  placeholder='Enter your email'
                  placeholderTextColor='#999999'
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => {
                    if (email && !isValidEmail(email)) {
                      setEmailError(true);
                      setEmailErrorMessage('Please enter a valid email address');
                    } else if (!email) {
                      setEmailError(true);
                      setEmailErrorMessage('Please enter email');
                    } else {
                      setEmailError(false);
                      setEmailErrorMessage('');
                    }
                  }}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />

                {emailError && (
                  <View className='mt-2 ml-1'>
                    <Text className='text-[#7e0b0b] text-[13px] font-inter-medium'>{emailErrorMessage}</Text>
                  </View>
                )}
              </View>

              <View>
                <Text className='text-gray-700 mb-1 font-medium'>Password</Text>
                <View className='w-full relative'>
                  <TextInput
                    className={`${isSmallScreen ? 'h-12' : 'h-14'} w-full bg-gray-100 rounded-lg p-4`}
                    placeholder='Enter your password'
                    placeholderTextColor='#999999'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onBlur={() => {
                      if (!password) {
                        setPasswordError(true);
                        setPasswordErrorMessage('Please enter password');
                      } else {
                        setPasswordError(false);
                        setPasswordErrorMessage('');
                      }
                    }}
                  />
                  <TouchableOpacity
                    className='absolute right-4 top-3'
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

              <View className={`${isSmallScreen ? 'mt-2 mb-4' : 'mt-3 mb-5'}`}>
                <TouchableOpacity 
                  className='self-end'
                  onPress={handleForgetPassword}
                >
                  <Text className={`text-[#0d1d35] text-right font-inter-bold ${isSmallScreen ? 'text-[12px]' : 'text-[14px]'}`}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View className='mt-2'>
                <Button
                  className='rounded-full p-4 shadow-sm'
                  variant='primary'
                  size='lg'
                  onPress={handleLogin}
                >
                  <Text className={`text-center text-[#ffff] ${isSmallScreen ? 'text-lg' : 'text-xl'} font-lato-bold`}>
                    Sign In
                  </Text>
                </Button>
              </View>

              <View className={`flex-row items-center justify-center ${isSmallScreen ? 'my-10' : 'my-14'}`}>
                <View className='h-[1px] bg-gray-300 w-1/3' />
                  <Text className='mx-2 font-inter-regular'>Or sign in with</Text>
                <View className='h-[1px] bg-gray-300 w-1/3' />
              </View>

              {/* Social login buttons */}
              <FlatList
                data={socialLoginOptions}
                renderItem={renderSocialButton}
                keyExtractor={(item) => item.id}
                horizontal
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                ItemSeparatorComponent={() => <View style={{ width: isSmallScreen ? 15 : 25 }} />}
                style={{ flexGrow: 0 }}
                className="self-center"
              />

              <View className={`flex-row justify-center ${isSmallScreen ? 'mt-6' : 'mt-8'}`}>
                <Text className='font-inter-regular'>Don't have an account? </Text>

                <TouchableOpacity onPress={handleSignUp}>
                  <Text className='text-[#0d1d35] font-inter-bold'>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
