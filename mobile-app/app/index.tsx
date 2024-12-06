import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
  View,
} from 'react-native';
import ProductListItem from '../components/ProductListItem';
// import products from '../assets/products.json';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';

import { listDolls } from '@/api/dolls';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { Box } from '@/components/ui/box';
import DarkMode from '@/utils/darkmode.context';
import { useContext } from 'react';

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dolls'],
    queryFn: listDolls,
  });
  const { isDarkMode } = useContext(DarkMode);
  const numColumns = useBreakpointValue({ default: 2, sm: 3, xl: 4 });
  if (isLoading) {
    return (
      <SafeAreaView className='w-full h-full flex items-center justify-center'>
        <ActivityIndicator
          size='small'
          color={`${isDarkMode ? '#f1f5f9' : '#262626'}`}
        />
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView
        className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
      >
        <Text
          className={`font-semibold text-2xl ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
        >
          Error fetching products
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <Box className={`p-2 ${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}>
      <Stack.Screen options={{ title: 'Home' }} />
      <FlatList
        data={data}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        className='gap-2 mx-auto w-full max-w-[960px]'
        contentContainerClassName='gap-2'
        columnWrapperClassName='gap-2'
        renderItem={({ item }) => <ProductListItem doll={item} />}
      />
    </Box>
  );
}
