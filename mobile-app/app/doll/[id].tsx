import { Text } from '@/components/ui/text';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
// import products from '@/assets/products.json';

import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchDoll } from '@/api/dolls';
import { ActivityIndicator, SafeAreaView } from 'react-native';
const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: doll,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`dolls`, id],
    queryFn: () => fetchDoll(Number(id)),
  });

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
        <Text className='font-semibold text-2xl'>Doll was not found!</Text>
      </SafeAreaView>
    );
  }
  return (
    <Box className='flex-1 items-center p-3'>
      <Stack.Screen options={{ title: doll.dollName }} />

      <Card className='p-4 rounded-lg max-w-[960px] w-full flex-1'>
        <Image
          source={{
            uri: doll.image,
          }}
          className='mb-6 max-w-[450px] aspect-square w-full rounded-md'
          alt={`${doll.dollName} image`}
          resizeMode='contain'
        />
        <Text className=' text-4xl font-normal mb-2 text-typography-700'>
          {doll.dollName}
        </Text>
        <VStack className='mb-6'>
          <Heading size='md' className='mb-4'>
            ${doll.price}
          </Heading>
          <Text size='sm'>{doll.description}</Text>
        </VStack>
        <Box className='flex-col sm:flex-row'>
          <Button className='px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1'>
            <ButtonText size='sm'>Add to cart</ButtonText>
          </Button>
          <Button
            variant='outline'
            className='px-4 py-2 border-outline-300 sm:flex-1'
          >
            <ButtonText size='sm' className='text-typography-600'>
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProductDetailsScreen;
