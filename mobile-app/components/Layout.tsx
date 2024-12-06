import { Slot, Stack, useRouter } from 'expo-router';
import { VStack } from './ui/vstack';
import { Box } from './ui/box';
import { HStack } from './ui/hstack';
import { Pressable, View } from 'react-native';
import { Icon } from './ui/icon';
import { Home, Settings, ShoppingCart, User } from 'lucide-react-native';
import { Text } from './ui/text';
import { useCart } from '@/store/cartStore';
import { useAuth } from '@/store/authStore';
import { useContext } from 'react';
import DarkMode from '@/utils/darkmode.context';

const Layout = () => {
  const { isDarkMode } = useContext(DarkMode);

  const cartItemsTotal = useCart((state: any) =>
    state.items.reduce((total: number, item: any) => total + item.quantity, 0)
  );
  const isLoggedIn = useAuth((state: any) => !!state.token);

  const router = useRouter();

  return (
    <VStack
      className={`flex-1 ${isDarkMode ? 'bg-[#262626]' : 'bg-slate-100'}`}
    >
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: `${isDarkMode ? '#262626' : '#f1f5f9'}`,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: `${isDarkMode ? '#f1f5f9' : '#262626'}`,
          },
          headerTitleAlign: 'center',
        }}
      >
        <Box className='flex-1'>
          <Slot />
        </Box>
      </Stack>

      <HStack
        className={`justify-between ${isDarkMode ? 'bg-[#262626]' : 'bg-slate-100'} p-4 border-t border-outline-300 ${isDarkMode && 'border-gray-50'} `}
      >
        <Pressable
          onPress={() => router.push('/')}
          className='items-center text-center'
        >
          <Icon
            as={Home}
            size='sm'
            className={` ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          />
          <Text
            className={`text-xs ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/cart')}
          className='relative flex items-center'
        >
          <Icon
            as={ShoppingCart}
            size='sm'
            className={`${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          />
          {cartItemsTotal > 0 && (
            <View
              style={{
                position: 'absolute',
                bottom: 18,
                left: 18,
                backgroundColor: 'red',
                borderRadius: 50,
                width: 16, // Эквивалент w-4
                height: 16, // Эквивалент h-4
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text className='text-white text-xs'>{cartItemsTotal}</Text>
            </View>
          )}
          <Text
            className={`text-xs ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Cart
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/settings')}
          className='items-center'
        >
          <Icon
            as={Settings}
            size='sm'
            className={` ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          />
          <Text
            className={`text-xs ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Settings
          </Text>
        </Pressable>
        {isLoggedIn ? (
          <Pressable
            onPress={() => router.push('/profile')}
            className='items-center'
          >
            <Icon
              as={User}
              size='sm'
              className={` ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
            />
            <Text
              className={`text-xs ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
            >
              Profile
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => router.push('/login')}
            className='items-center'
          >
            <Icon
              as={User}
              size='sm'
              className={`${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
            />
            <Text
              className={`text-xs ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
            >
              Login
            </Text>
          </Pressable>
        )}
      </HStack>
    </VStack>
  );
};

export default Layout;
