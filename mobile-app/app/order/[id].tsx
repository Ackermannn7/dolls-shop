import React, { useContext } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { ScrollView, ActivityIndicator } from 'react-native';
import { getOrder } from '@/api/orders';
import { Image } from '@/components/ui/image';
import DarkMode from '@/utils/darkmode.context';

export default function OrderDetailsScreen() {
  const { isDarkMode } = useContext(DarkMode);

  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Box
        className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
      >
        <ActivityIndicator
          size='small'
          color={`${isDarkMode ? '#f1f5f9' : '#262626'}`}
        />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box
        className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
      >
        <Text className='text-red-500'>Failed to load order details.</Text>
      </Box>
    );
  }

  return (
    <ScrollView
      className={`flex-1 ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
    >
      <Stack.Screen options={{ title: `Order ${order.id}` }} />
      <VStack
        className={`p-4 bg-white shadow rounded-lg m-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
      >
        <Text
          className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          Order #{order.id}
        </Text>
        <Text
          className={`text-sm text-black ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          Created at: {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        <Text
          bold
          className={`text-lg text-black mb-4 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          Total: ${order.totalAmount.toFixed(2) || '0.00'}
        </Text>

        <VStack
          className={`border-t pt-4 ${isDarkMode ? 'border-[#f1f5f9]' : 'border-[#262626]'}`}
        >
          <Text
            className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Order Items:
          </Text>
          {order.items.map((item: any, index: number) => (
            <Box
              key={item.id}
              className={`py-2 flex-row items-center ${
                index !== order.items.length - 1
                  ? `border-b ${isDarkMode ? 'border-[#f1f5f9]' : 'border-[#262626]'}`
                  : ''
              }`}
            >
              {/* Название и изображение */}
              <Box className='flex-row items-center' style={{ flex: 5 }}>
                <Image
                  source={{ uri: item.dollImage }}
                  className='w-10 h-10 rounded-sm'
                  alt={`${item.dollName}`}
                />
                <Text
                  bold
                  className={`text-lg ml-2 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                >
                  {item.dollName}
                </Text>
              </Box>
              {/* Количество */}
              <Text
                bold
                className={`text-md ml-2 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                style={{ flex: 2, textAlign: 'center' }}
              >
                Qty: {item.quantity}
              </Text>
              {/* Цена */}
              <Text
                bold
                className={`text-md ml-2 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
                style={{ flex: 2, textAlign: 'right' }}
              >
                ${item.price.toFixed(2)}
              </Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
}
