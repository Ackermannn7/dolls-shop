import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Link, Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import { ShoppingCart, User } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useCart } from '@/store/cartStore';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/store/authStore';

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsTotal = useCart((state: any) =>
    state.items.reduce((total: number, item: any) => total + item.quantity, 0)
  );
  const isLoggedIn = useAuth((s: any) => !!s.token);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () => (
              <Link href={'/cart'} asChild>
                <Pressable className='flex-row gap-2'>
                  <Icon as={ShoppingCart} />
                  {cartItemsTotal > 0 && <Text>{cartItemsTotal}</Text>}
                </Pressable>
              </Link>
            ),
          }}
        >
          <Stack.Screen
            name='index'
            options={{
              title: 'Shop',
              headerLeft: () =>
                !isLoggedIn && (
                  <Link href={'/login'} asChild>
                    <Pressable className='flex-row gap-2'>
                      <Icon as={User} />
                    </Pressable>
                  </Link>
                ),
            }}
          />
          <Stack.Screen name='doll/[id]' options={{ title: 'Doll' }} />
          <Stack.Screen name='cart' options={{ title: 'Cart' }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
