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

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dolls'],
    queryFn: listDolls,
  });

  const numColumns = useBreakpointValue({ default: 2, sm: 3, xl: 4 });
  if (isLoading) {
    return (
      <SafeAreaView className='w-full h-full flex items-center justify-center'>
        <ActivityIndicator size='large' color='#1f1f1f' />
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView className='w-full h-full flex items-center justify-center'>
        <Text className='font-semibold text-2xl'>Error fetching products</Text>
      </SafeAreaView>
    );
  }
  return (
    <FlatList
      data={data}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      className='gap-2 mx-auto w-full max-w-[960px]'
      contentContainerClassName='gap-2'
      columnWrapperClassName='gap-2'
      renderItem={({ item }) => <ProductListItem doll={item} />}
    />
  );
}
