import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';
import EmptyCart from '@/components/EmptyCart';
import { Image } from '@/components/ui/image';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';
import { Stack } from 'expo-router';
import { Box } from '@/components/ui/box';
import DarkMode from '@/utils/darkmode.context';
import { useContext } from 'react';

export default function CartScreen() {
  const { isDarkMode } = useContext(DarkMode);

  const items = useCart((state: any) => state.items);

  const resetCart = useCart((state: any) => state.resetCart);

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item: any) => ({
          dollId: item.doll.id,
          quantity: item.quantity,
          price: item.doll.price * item.quantity,
        }))
      ),
    onSuccess: () => {
      resetCart();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onCheckout = async () => {
    createOrderMutation.mutate();
  };

  return (
    <View
      className={`w-full h-full ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
    >
      <Stack.Screen options={{ title: `Cart` }} />
      {items.length > 0 ? (
        <Box className='w-full flex'>
          <FlatList
            data={items}
            contentContainerClassName={`gap-4 max-w-[960px] w-full mx-auto ${isDarkMode ? 'bg-black' : 'bg-white'}`}
            renderItem={({ item, index }) => (
              <Box>
                <HStack
                  className={`bg-white p-3 items-center justify-between ${isDarkMode ? 'bg-black' : 'bg-white'}`}
                >
                  <HStack className='gap-3 items-center'>
                    <Text
                      className={`text-lg ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'} `}
                    >
                      {index + 1}.
                    </Text>
                    <Image
                      className='w-20 h-20 rounded-sm'
                      source={{
                        uri: item.doll.image,
                      }}
                      alt={item.doll.dollName}
                    />
                    <VStack className='justify-center'>
                      <Text
                        className={`text-xl ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                        bold
                      >
                        {item.doll.dollName}
                      </Text>
                      <Text
                        className={`text-lg ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                      >
                        $ {item.doll.price}
                      </Text>
                    </VStack>
                  </HStack>

                  {/* Правая часть: Количество */}
                  <Text
                    className={`text-lg ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                  >
                    {item.quantity}
                  </Text>
                </HStack>
                <View className='border-t border-[#7e7e7e]' />
              </Box>
            )}
          />

          <Button
            className={`mt-10 flex self-center justify-center items-center max-w-32 w-full text-xl ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'} bg-green-500`}
            onPress={onCheckout}
          >
            <ButtonText
              className={`${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'} `}
            >
              Checkout
            </ButtonText>
          </Button>
        </Box>
      ) : (
        <EmptyCart />
      )}
    </View>
  );
}
