import React, { useContext, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/api/auth';
import { useAuth } from '@/store/authStore';
import { Redirect, Stack } from 'expo-router';
import DarkMode from '@/utils/darkmode.context';

export default function RegisterScreen() {
  const { isDarkMode } = useContext(DarkMode);

  const setUser = useAuth((s: any) => s.setUser);
  const setToken = useAuth((s: any) => s.setToken);
  const isLoggedIn = useAuth((s: any) => !!s.token);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    form: '',
  });

  const [loading, setLoading] = useState(false); // Track loading state

  const signupMutation = useMutation({
    mutationFn: () => signup(name, email, password),
    onSuccess: (data) => {
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
      setLoading(false); // Stop loading on success
    },
    onError: () => {
      setErrors((prev) => ({
        ...prev,
        form: 'An error occurred during registration. Please try again.',
      }));
      setLoading(false); // Stop loading on error
    },
  });

  const validate = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      form: '',
    };

    const validations = [
      {
        field: 'name',
        value: name,
        tests: [
          { test: (value: string) => !value, error: 'Name is required.' },
        ],
      },
      {
        field: 'email',
        value: email,
        tests: [
          { test: (value: string) => !value, error: 'Email is required.' },
          {
            test: (value: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            error: 'Invalid email format.',
          },
        ],
      },
      {
        field: 'password',
        value: password,
        tests: [
          { test: (value: string) => !value, error: 'Password is required.' },
          {
            test: (value: string) => value.length < 8,
            error: 'Password must be at least 8 characters.',
          },
          {
            test: (value: string) => !/[A-Z]/.test(value),
            error: 'Password must contain at least one uppercase letter.',
          },
          {
            test: (value: string) => !/[0-9]/.test(value),
            error: 'Password must contain at least one number.',
          },
          {
            test: (value: string) => !/[!@#$%^&*(),.?":{}|<>]/.test(value),
            error: 'Password must contain at least one special character.',
          },
        ],
      },
      {
        field: 'confirmPassword',
        value: confirmPassword,
        tests: [
          {
            test: (value: string) => !value,
            error: 'Please confirm your password.',
          },
          {
            test: () => password !== confirmPassword,
            error: 'Passwords do not match.',
          },
        ],
      },
    ];

    validations.forEach(({ field, value, tests }) => {
      for (const { test, error } of tests) {
        if (test(value)) {
          newErrors[field as keyof typeof newErrors] = error;
          break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).every(
      (key) => !newErrors[key as keyof typeof newErrors]
    );
  };

  const handleRegister = () => {
    if (validate()) {
      setLoading(true); // Start loading
      signupMutation.mutate();
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  if (isLoggedIn) {
    return <Redirect href={'/'} />;
  }

  return (
    <SafeAreaView
      className={`flex-1 justify-center ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
    >
      <Stack.Screen options={{ title: 'Registration' }} />
      <FormControl
        className={`px-4 py-8 border rounded-lg max-w-[500px] 
        border-outline-300 m-2 ${isDarkMode ? 'bg-[#000]' : 'bg-[#fff]'}`}
      >
        <VStack space='xl'>
          <Heading
            className={`text-center text-typography-900 text-2xl leading-3 pt-3 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Sign up
          </Heading>

          <VStack space='xs'>
            <Text
              className={`text-typography-500 leading-1 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
            >
              Name
            </Text>
            <Input>
              <InputField
                className={` ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                type='text'
                placeholder='Enter your name'
                value={name}
                onChangeText={setName}
              />
            </Input>
            {errors.name && (
              <Text className='text-red-500 text-sm'>{errors.name}</Text>
            )}
          </VStack>

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
                onChangeText={setEmail}
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
                onChangeText={setPassword}
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

          <VStack space='xs'>
            <Text
              className={`text-typography-500 leading-1 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
            >
              Confirm Password
            </Text>
            <Input>
              <InputField
                className={` ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirm your password'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <InputSlot className='pr-3' onPress={togglePasswordVisibility}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  className='text-darkBlue-500'
                />
              </InputSlot>
            </Input>
            {errors.confirmPassword && (
              <Text className='text-red-500 text-sm'>
                {errors.confirmPassword}
              </Text>
            )}
          </VStack>

          {errors.form && (
            <Text className='text-red-500 text-center text-sm'>
              {errors.form}
            </Text>
          )}

          <Button
            className={`mt-2 ${isDarkMode ? 'bg-[#f1f5f9]' : 'bg-[#262626]'}`}
            onPress={handleRegister}
            disabled={loading} // Disable button during loading
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
                Sign up
              </ButtonText>
            )}
          </Button>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
}
