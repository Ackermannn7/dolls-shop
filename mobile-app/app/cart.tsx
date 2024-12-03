import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { FlatList } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';
import EmptyCart from '@/components/EmptyCart';
import { Image } from '@/components/ui/image';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';

export default function CartScreen() {
  const items = useCart((state: any) => state.items);
  console.log(items);

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
    onSuccess: (data) => {
      console.log(data);
      resetCart();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onCheckout = async () => {
    createOrderMutation.mutate();
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
