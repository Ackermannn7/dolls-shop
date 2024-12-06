import React, { useContext, useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { Link, Redirect, Stack } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth';
import { useAuth } from '@/store/authStore';
import DarkMode from '@/utils/darkmode.context';

export default function LoginScreen() {
  const { isDarkMode } = useContext(DarkMode);

  const setUser = useAuth((s: any) => s.setUser);
  const setToken = useAuth((s: any) => s.setToken);
  const isLoggedIn = useAuth((s: any) => !!s.token);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: '',
  });

  const [loading, setLoading] = useState(false); // Loading state

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
      setLoading(false); // Stop loading after success
    },
    onError: () => {
      setErrors((prev) => ({ ...prev, form: 'Invalid email or password.' }));
      setLoading(false); // Stop loading after error
    },
  });

  const validate = () => {
    const newErrors: { email: string; password: string; form: string } = {
      email: '',
      password: '',
      form: '',
    };

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required.';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).every(
      (key) => !newErrors[key as keyof typeof newErrors]
    );
  };

  const handleLogin = () => {
    if (validate()) {
      setLoading(true); // Start loading before mutation
      loginMutation.mutate();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (isLoggedIn) {
    return <Redirect href={'/'} />;
  }

  return (
    <SafeAreaView
      className={`flex-1 justify-center ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
    >
      <Stack.Screen options={{ title: 'Authorization' }} />
      <FormControl
        className={`px-4 py-8 border rounded-lg max-w-[500px] 
        border-outline-300 m-2 ${isDarkMode ? 'bg-[#000]' : 'bg-[#fff]'}`}
      >
        <VStack space='xl'>
          <Heading
            className={`text-center text-typography-900 text-2xl leading-3 pt-3 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Login
          </Heading>

          <VStack space='xs'>
            <Text
              className={`text-typography-500 leading-1 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
            >
              Email
            </Text>
            <Input>
              <InputField
                className={` ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                type='text'
                placeholder='Enter your email'
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Input>
            {errors.email && (
              <Text className='text-red-500 text-sm'>{errors.email}</Text>
            )}
          </VStack>

          <VStack space='xs'>
            <Text
              className={`text-typography-500 leading-1 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
            >
              Password
            </Text>
            <Input>
              <InputField
                className={` ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <InputSlot className='pr-3' onPress={togglePasswordVisibility}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  className='text-darkBlue-500'
                />
              </InputSlot>
            </Input>
            {errors.password && (
              <Text className='text-red-500 text-sm'>{errors.password}</Text>
            )}
          </VStack>

          {errors.form && (
            <Text className='text-red-500 text-center text-sm'>
              {errors.form}
            </Text>
          )}

          <Button
            className={`mt-2 ${isDarkMode ? 'bg-[#f1f5f9]' : 'bg-[#262626]'}`}
            onPress={handleLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <ActivityIndicator
                size='small'
                color={isDarkMode ? '#262626' : '#f1f5f9'}
              />
            ) : (
              <ButtonText
                className={` ${isDarkMode ? 'text-[#262626]' : 'text-[#f1f5f9]'}`}
              >
                Sign in
              </ButtonText>
            )}
          </Button>

          <Link href='/register' asChild>
            <Pressable>
              <Text
                className={`mt-4 text-center text-sm text-typography-500 underline ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
              >
                Don't have an account? Please sign up!
              </Text>
            </Pressable>
          </Link>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
}
