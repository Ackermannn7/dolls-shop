import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import {
  LogOut,
  ShoppingCart,
  User,
  Home,
  Settings,
} from 'lucide-react-native';
import { useCart } from '@/store/cartStore';
import { useAuth } from '@/store/authStore';
import { useRouter, Slot } from 'expo-router';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable, SafeAreaView } from 'react-native';

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsTotal = useCart((state: any) =>
    state.items.reduce((total: number, item: any) => total + item.quantity, 0)
  );
  const isLoggedIn = useAuth((state: any) => !!state.token);
  const logoutFn = useAuth((state: any) => state.logout);

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <SafeAreaView className='flex-1'>
          <VStack className='flex-1 bg-slate-100'>
            {/* Основной контент */}
            <Box className='flex-1'>
              <Slot /> {/* Это будет заменено текущим активным экраном */}
            </Box>

            {/* Нижнее меню */}
            <HStack className='justify-between bg-white p-4 border-t border-outline-300'>
              <Pressable
                onPress={() => router.push('/')}
                className='items-center text-center'
              >
                <Icon as={Home} size='sm' />
                <Text className='text-xs'>Home</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push('/cart')}
                className='relative flex items-center'
              >
                <Icon as={ShoppingCart} size='sm' />
                {cartItemsTotal > 0 && (
                  <Box className='absolute bottom-5 left-5 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center'>
                    <Text className='text-white text-xs'>{cartItemsTotal}</Text>
                  </Box>
                )}
                <Text className='text-xs'>Cart</Text>
              </Pressable>
              {isLoggedIn ? (
                <>
                  <Pressable
                    onPress={() => router.push('/profile')}
                    className='items-center'
                  >
                    <Icon as={User} size='sm' />
                    <Text className='text-xs'>Profile</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => router.push('/settings')}
                    className='items-center'
                  >
                    <Icon as={Settings} size='sm' />
                    <Text className='text-xs'>Settings</Text>
                  </Pressable>
                  <Pressable
                    onPress={async () => await logoutFn()}
                    className='items-center'
                  >
                    <Icon as={LogOut} size='sm' />
                    <Text className='text-xs'>Logout</Text>
                  </Pressable>
                </>
              ) : (
                <Pressable
                  onPress={() => router.push('/login')}
                  className='items-center'
                >
                  <Icon as={User} size='sm' />
                  <Text className='text-xs'>Login</Text>
                </Pressable>
              )}
            </HStack>
          </VStack>
        </SafeAreaView>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
