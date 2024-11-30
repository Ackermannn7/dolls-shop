import { FlatList, useWindowDimensions } from 'react-native';
import ProductListItem from '../components/ProductListItem';
import products from '../assets/products.json';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { useMemo } from 'react';

export default function HomeScreen() {
  const numColumns = useBreakpointValue({ default: 2, sm: 3, xl: 4 });
  console.log('re-render');

  return (
    <FlatList
      data={products}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      className='gap-2 mx-auto w-full max-w-[960px]'
      contentContainerClassName='gap-2'
      columnWrapperClassName='gap-2'
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
