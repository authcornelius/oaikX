import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { AntDesign, EvilIcons, FontAwesome, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import GoogleIcon from '../../assets/images/icons8-google-48.png'
import { Image } from 'react-native';
import Button from '@/components/Button';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Get screen dimensions for responsive calculations
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // input validation error state
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [checkedError, setCheckedError] = useState(false);
  const [checkedErrorMessage, setCheckedErrorMessage] = useState('');

  
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

  const handleSignUp = () => {
    let isValid = true;
    
    // Full name validation
    if (!fullName) {
      setFullNameError(true);
      setFullNameErrorMessage('Please enter your name');
      isValid = false;
    } else if (fullName.length < 3) {
      setFullNameError(true);
      setFullNameErrorMessage('Please enter a valid name');
      isValid = false;
    } else {
      setFullNameError(false);
      setFullNameErrorMessage('');
    }
    
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

    if (checked === false) {
      setCheckedError(true);
      setCheckedErrorMessage('Please accept the terms and conditions');
      isValid = false;
    } else {
      setCheckedError(false);
      setCheckedErrorMessage('');
    }
    
    // If all validations pass, proceed with login
    if (isValid) {
      console.log('Login attempt with:', email, password);
      // Uncomment to navigate to home after successful validation
      router.push('/(auth)/otp-verification');
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };
  // Render each social login button
  const renderSocialButton = ({ item }) => (
    <TouchableOpacity 
      className={`border-2 border-gray-300 rounded-full ${isSmallScreen ? 'w-12 h-12' : 'w-16 h-16'} items-center justify-center`}
      // onPress={() => handleSocialLogin(item.id)}
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
        className={`${Platform.OS === 'ios' ? 'px-4' : isSmallScreen ? 'px-10' : 'px-4 py-6'}`}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1 items-center justify-center'
        >
          <View className='w-full max-w-sm'>
            <Text className={`${isSmallScreen ? 'text-xl' : 'text-2xl'} text-center mt-2 font-inter-bold`}>
              Create Account
            </Text>

            <Text className={`${isSmallScreen ? 'text-sm' : 'text-md'} text-center mt-1 text-gray-600 font-inter-regular`}>
              Fill in the details below or register with your social account
            </Text>
            
            <View className={`${isSmallScreen ? 'mt-6' : 'mt-8'} w-full`}>
              <View className={`${isSmallScreen ? 'mb-3' : 'mb-7'}`}>
                <Text className='w-full text-gray-700 mb-1 font-inter-medium'>Username</Text>
                <TextInput
                  className={`${isSmallScreen ? 'h-12' : 'h-14'} w-full bg-gray-100 rounded-lg p-4`}
                  placeholder='Enter username'
                  placeholderTextColor='#999999'
                  value={fullName}
                  onChangeText={setFullName}
                  onBlur={() => {
                    if (fullName && fullName.length < 3) {
                      setFullNameError(true);
                      setFullNameErrorMessage('Please enter a valid name');
                    } else if (!fullName) {
                      setFullNameError(true);
                      setFullNameErrorMessage('Please enter your name');
                    } else {
                      setFullNameError(false);
                      setFullNameErrorMessage('');
                    }
                  }}
                  keyboardType='default'
                  autoCapitalize='none'
                />

                {fullNameError && (
                  <View className='mt-2 ml-1'>
                    <Text className='text-[#7e0b0b] text-[13px] font-inter-medium'>{fullNameErrorMessage}</Text>
                  </View>
                )}
              </View>

              <View className={`${isSmallScreen ? 'mb-3' : 'mb-7'}`}>
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
                  className='self-start flex flex-row items-center'
                  onPress={() => setChecked(!checked)}
                >
                  <MaterialIcons
                    name={checked ? 'check-box' : 'check-box-outline-blank'}
                    size={isSmallScreen ? 20 : 24}
                    color={checked ? '#0d1d35' : '#0d1d35'}
                  />
                  <Text className={`text-[#0d1d35] text-left font-inter-bold ${isSmallScreen ? 'text-sm' : 'text-base'}`}>
                    I agree to the Terms and Conditions
                  </Text>
                </TouchableOpacity>
                {checkedError && (
                  <View className='mt-2 ml-1'>
                    <Text className='text-[#7e0b0b] text-[13px] font-inter-medium'>{checkedErrorMessage}</Text>
                  </View>
                )}
              </View>

              <View className='mt-2'>
                <Button
                  className='rounded-full p-4 shadow-sm'
                  variant='primary'
                  size='lg'
                  onPress={handleSignUp}
                >
                  <Text className={`text-center text-[#ffff] ${isSmallScreen ? 'text-lg' : 'text-xl'} font-lato-bold`}>
                    Register
                  </Text>
                </Button>
              </View>

              <View className={`flex-row items-center justify-center ${isSmallScreen ? 'my-5' : 'my-14'}`}>
                <View className='h-[1px] bg-gray-300 w-1/3' />
                  <Text className='mx-2 font-inter-regular'>Or sign up with</Text>
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

              <View className={`flex-row justify-center ${isSmallScreen ? 'mt-3' : 'mt-8'}`}>
                <Text className='font-inter-regular'>Already have an account? </Text>

                <TouchableOpacity onPress={handleLogin}>
                  <Text className='text-[#0d1d35] font-inter-bold'>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
