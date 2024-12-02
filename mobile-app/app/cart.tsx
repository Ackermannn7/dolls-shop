import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { View, FlatList, Alert } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';
import { Box } from '@/components/ui/box';
import EmptyCart from '@/components/EmptyCart';

export default function CartScreen() {
  const items = useCart((state: any) => state.items);
  const resetCart = useCart((state: any) => state.resetCart);
  const onCheckout = async () => {
    resetCart();
  };
  return items.length > 0 ? (
    <FlatList
      data={items}
      contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto'
      renderItem={({ item }) => (
        <HStack className='bg-white p-3'>
          <VStack space='sm'>
            <Text bold>{item.doll.dollName}</Text>
            <Text>$ {item.doll.price}</Text>
          </VStack>
          <Text className='ml-auto'>{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  ) : (
    <EmptyCart />
  );
}
