import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Appearance, SafeAreaView, useColorScheme } from 'react-native';

import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from '@react-navigation/native';
import DarkMode from '@/utils/darkmode.context';
import { StatusBar } from 'expo-status-bar';
const queryClient = new QueryClient();

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useDeviceSettings, setUseDeviceSettings] = useState(false);
  const scheme = useColorScheme(); // this gets the current native appearance of device

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: 'white',
      background: '#202120',
      card: '#121212',
    },
  };

  useEffect(() => {
    let subscription: any;

    if (useDeviceSettings) {
      subscription = Appearance.addChangeListener((scheme) => {
        // Is dark mode will be true when scheme.colorScheme is equal to 'dark'
        setIsDarkMode(scheme.colorScheme === 'dark');
      });
    }

    // cleanup
    return () => {
      if (subscription) {
        subscription.remove();
        subscription = null;
      }
    };
  }, [scheme, isDarkMode, useDeviceSettings]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider> */}
      <DarkMode.Provider
        value={{
          isDarkMode,
          setIsDarkMode,
          useDeviceSettings,
          setUseDeviceSettings,
        }}
      >
        <GluestackUIProvider>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />

          <SafeAreaView
            className={`flex-1 ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
          >
            <Layout />
          </SafeAreaView>
        </GluestackUIProvider>
      </DarkMode.Provider>
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
}
