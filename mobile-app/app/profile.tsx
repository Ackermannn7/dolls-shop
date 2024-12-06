import React, { useContext, useEffect } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { ScrollView, Pressable, ActivityIndicator, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/orders';
import { useAuth } from '@/store/authStore';
import { Stack, useRouter } from 'expo-router';
import DarkMode from '@/utils/darkmode.context';

export default function ProfileScreen() {
  const user = useAuth((state: any) => state.user);
  const router = useRouter();
  const { isDarkMode } = useContext(DarkMode);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (!user) {
    return (
      <View
        className={`flex-1 justify-center items-center ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
      >
        <Text
          className={`text-lg font-bold ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          You are not logged in.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className={`flex-1 p-2 ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
    >
      <Stack.Screen options={{ title: 'Profile' }} />
      <VStack
        className={`p-4 bg-white rounded-lg shadow my-4 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
      >
        <Text
          className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          Personal info
        </Text>
        <Text
          className={`text-lg  ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          Name: {user.name}
        </Text>
        <Text
          className={`text-lg  ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          Email: {user.email}
        </Text>
      </VStack>

      <VStack
        className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-black' : 'bg-white'}`}
      >
        <Text
          className={`text-xl font-bold mb-2 ${
            isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'
          }`}
        >
          Order History
        </Text>
        {isLoading && (
          <ActivityIndicator
            size='small'
            color={`${isDarkMode ? '#f1f5f9' : '#262626'}`}
          />
        )}
        {error && (
          <Text className={`text-red-500 text-xl`}>
            Failed to fetch orders.
          </Text>
        )}
        {!isLoading && !error && (!orders || orders.length === 0) && (
          <Text
            className={`text-lg ${
              isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'
            }`}
          >
            No orders found.
          </Text>
        )}
        {!isLoading &&
          !error &&
          orders?.length > 0 &&
          orders.map((order: any) => (
            <Pressable
              key={order.id}
              onPress={() => router.push(`/order/${order.id}`)}
              className='p-3 border-b border-gray-200'
            >
              <Text
                className={`text-lg font-medium ${
                  isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'
                }`}
              >
                Order #{order.id}
              </Text>
              <Text
                className={`text-md ${
                  isDarkMode ? 'text-[#f1f5f9]' : 'text-gray-500'
                }`}
              >
                Created at: {new Date(order.createdAt).toLocaleDateString()}
              </Text>
            </Pressable>
          ))}
      </VStack>
    </ScrollView>
  );
}
