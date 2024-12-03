import React, { useState } from 'react';
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
import { Redirect } from 'expo-router';

export default function RegisterScreen() {
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

  const signupMutation = useMutation({
    mutationFn: () => signup(name, email, password),
    onSuccess: (data) => {
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: () => {
      setErrors((prev) => ({
        ...prev,
        form: 'An error occurred during registration. Please try again.',
      }));
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
      signupMutation.mutate();
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  if (isLoggedIn) {
    return <Redirect href={'/'} />;
  }

  return (
    <FormControl className='p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2'>
      <VStack space='xl'>
        <Heading className='text-typography-900 leading-3 pt-3'>
          Register
        </Heading>

        {/* Name Field */}
        <VStack space='xs'>
          <Text className='text-typography-500 leading-1'>Name</Text>
          <Input>
            <InputField
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

        {/* Email Field */}
        <VStack space='xs'>
          <Text className='text-typography-500 leading-1'>Email</Text>
          <Input>
            <InputField
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

        {/* Password Field */}
        <VStack space='xs'>
          <Text className='text-typography-500 leading-1'>Password</Text>
          <Input>
            <InputField
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

        {/* Confirm Password Field */}
        <VStack space='xs'>
          <Text className='text-typography-500 leading-1'>
            Confirm Password
          </Text>
          <Input>
            <InputField
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

        {/* Form-level error */}
        {errors.form && (
          <Text className='text-red-500 text-center text-sm'>
            {errors.form}
          </Text>
        )}

        {/* Register Button */}
        <Button onPress={handleRegister}>
          <ButtonText>Register</ButtonText>
        </Button>
      </VStack>
    </FormControl>
  );
}
