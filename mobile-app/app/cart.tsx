import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';
import EmptyCart from '@/components/EmptyCart';
import { Image } from '@/components/ui/image';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';
import { Stack, useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import DarkMode from '@/utils/darkmode.context';
import { useContext, useEffect, useState } from 'react';
import { createPaymentIntent } from '@/api/stripe';
import { useStripe } from '@stripe/stripe-react-native';

export default function CartScreen() {
  const router = useRouter();
  const { isDarkMode } = useContext(DarkMode);
  const items = useCart((state: any) => state.items);
  const resetCart = useCart((state: any) => state.resetCart);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false); // ✅ Убедитесь, что loading обновляется корректно
  console.log(loading);

  const onCheckout = async () => {
    setLoading(true); // ✅ Установите состояние загрузки
    try {
      await createOrderMutation.mutateAsync();
    } catch (error) {
      console.error('Checkout Error:', error);
      Alert.alert('Error', 'Unable to complete the checkout process');
    } finally {
      setLoading(false); // ✅ Отключаем загрузку после завершения
    }
  };

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item: any) => ({
          dollId: item.doll.id,
          quantity: item.quantity,
          price: item.doll.price,
        }))
      ),
    onSuccess: (data) => {
      paymentIntentMutation.mutate({ orderId: data.id });
    },
    onError: (error) => {
      console.log(error);
      Alert.alert('Error', 'The order was not created!');
      setLoading(false); // ✅ Обновляем состояние загрузки
    },
  });

  const paymentIntentMutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: async (data) => {
      const { customer, ephemeralKey, paymentIntent } = data;

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Dolls for all',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
      });
      if (error) {
        console.log('Init Payment Sheet Error:', error);
        Alert.alert('Error', error.message);
        setLoading(false); // ✅ Устанавливаем loading в false
        return;
      }
      await openPaymentSheet();
    },
    onError: (error) => {
      console.log(error);
      setLoading(false); // ✅ Устанавливаем loading в false
      Alert.alert('Error', 'Unable to create Payment Intent');
    },
  });

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log('Payment Sheet Error:', error);
      Alert.alert('Error', 'Payment is not completed!');
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      resetCart();
      router.replace('/');
    }
    setLoading(false); // ✅ Устанавливаем loading в false
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
                      source={{ uri: item.doll.image }}
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
            className={`mt-10 flex self-center justify-center items-center max-w-32 w-full text-xl  ${loading ? 'bg-slate-400' : 'bg-green-500'}`}
            onPress={onCheckout}
            disabled={loading} // ✅ Устанавливаем состояние disabled
          >
            {loading ? (
              <ActivityIndicator
                size='small'
                color={isDarkMode ? '#f1f5f9' : '#262626'}
              />
            ) : (
              <ButtonText
                className={`${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
              >
                Checkout
              </ButtonText>
            )}
          </Button>
        </Box>
      ) : (
        <EmptyCart />
      )}
    </View>
  );
}
