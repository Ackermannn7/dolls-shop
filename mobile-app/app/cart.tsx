import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { FlatList } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';
import EmptyCart from '@/components/EmptyCart';
import { Image } from '@/components/ui/image';

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
        <HStack className='bg-white p-3 items-center justify-between'>
          {/* Левая часть: Изображение и текст */}
          <HStack className='gap-3 items-center'>
            <Image
              className='w-20 h-20 rounded-sm'
              source={{
                uri: item.doll.image,
              }}
              alt={item.doll.dollName}
            />
            <VStack className='justify-center'>
              <Text className='text-xl' bold>
                {item.doll.dollName}
              </Text>
              <Text className='text-lg'>$ {item.doll.price}</Text>
            </VStack>
          </HStack>

          {/* Правая часть: Количество */}
          <Text className='text-lg'>{item.quantity}</Text>
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
