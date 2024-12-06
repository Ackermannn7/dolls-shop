import React, { useCallback, useContext, useEffect } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';

import { useAuth } from '@/store/authStore';
import { Stack } from 'expo-router';

import {
  ColorSchemeName,
  Pressable,
  StyleSheet,
  Switch,
  useColorScheme,
  View,
} from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Sun, Moon } from 'lucide-react-native';

import DarkMode from '@/utils/darkmode.context';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

export default function SettingsScreen() {
  const isLoggedIn = useAuth((state: any) => !!state.token);
  const logoutFn = useAuth((state: any) => state.logout);

  const { isDarkMode, setIsDarkMode, useDeviceSettings, setUseDeviceSettings } =
    useContext(DarkMode);

  const scheme = useColorScheme();
  const currentActivatedTheme: ColorSchemeName = isDarkMode ? 'dark' : 'light';
  function handleUseDeviceTheme() {
    setUseDeviceSettings(!useDeviceSettings);
    if (scheme === 'dark') {
      setIsDarkMode(true);
      return;
    }
    setIsDarkMode(false);
  }

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode, scheme, useDeviceSettings]);

  useEffect(() => {
    if (currentActivatedTheme !== scheme) {
      setUseDeviceSettings(false);
    }
  }, [isDarkMode, useDeviceSettings]);

  return (
    <VStack
      className={`w-full h-full ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'} gap-4 p-2`}
    >
      <Stack.Screen options={{ title: `Settings` }} />

      <Box
        className={`bg-white rounded-lg shadow p-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
      >
        <Heading
          className={`font-bold mb-4 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          Appearance
        </Heading>
        <HStack className='justify-between items-center p-3'>
          <Text
            className={`text-lg opacity-60 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Use device theme
          </Text>
          <Switch
            trackColor={{
              true: '#02b875',
              false: '#eee',
            }}
            onChange={handleUseDeviceTheme}
            value={useDeviceSettings}
            thumbColor={'white'}
          />
        </HStack>

        <View className='border-t border-[#adadad]' />

        <HStack className='justify-between items-center p-3'>
          <Text
            className={`text-lg opacity-60 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Dark Mode
          </Text>
          <Switch
            trackColor={{
              true: '#02b875',
              false: 'gray',
            }}
            value={isDarkMode}
            onChange={toggleDarkMode}
            thumbColor={'white'}
          />
        </HStack>
      </Box>

      {/* Logout Section */}
      {isLoggedIn && (
        <Box
          className={`bg-white rounded-lg shadow p-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
        >
          <Heading
            className={`font-bold mb-4 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Account
          </Heading>

          <Pressable
            className='bg-red-500 rounded-lg p-3 items-center'
            onPress={async () => await logoutFn()}
          >
            <Text className='text-white font-bold'>Logout</Text>
          </Pressable>
        </Box>
      )}
    </VStack>
  );
}
