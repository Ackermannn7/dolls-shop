import React, { useState } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { Link, Redirect } from 'expo-router';
import { Pressable } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth';
import { useAuth } from '@/store/authStore';

export default function LoginScreen() {
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

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: () => {
      setErrors((prev) => ({ ...prev, form: 'Invalid email or password.' }));
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
    <FormControl className='p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2'>
      <VStack space='xl'>
        <Heading className='text-typography-900 leading-3 pt-3'>Login</Heading>

        {/* Email Field */}
        <VStack space='xs'>
          <Text className='text-typography-500 leading-1'>Email</Text>
          <Input>
            <InputField
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

        {/* Password Field */}
        <VStack space='xs'>
          <Text className='text-typography-500 leading-1'>Password</Text>
          <Input>
            <InputField
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

        {/* Form-level error */}
        {errors.form && (
          <Text className='text-red-500 text-center text-sm'>
            {errors.form}
          </Text>
        )}

        {/* Login Button */}
        <Button className='mt-2' onPress={handleLogin}>
          <ButtonText>Sign in</ButtonText>
        </Button>

        {/* Register Link */}
        <Link href='/register' asChild>
          <Pressable>
            <Text className='mt-4 text-center text-sm text-typography-500 underline'>
              Don't have an account? Please sign up!
            </Text>
          </Pressable>
        </Link>
      </VStack>
    </FormControl>
  );
}
