import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './ui/text';
import { Image } from './ui/image';
import { Link } from 'expo-router';
import { Button, ButtonText } from './ui/button';
// @ts-ignore
import emptyCartImg from '../assets/empty-cart-removebg-preview.png';
const EmptyCart = () => {
  return (
    <View className='w-full h-full flex items-center justify-center'>
      <Text className='text-4xl font-bold mb-4'>The Cart is Empty!😕</Text>
      <Text className='text-center text-lg'>
        Looks like you haven't added anything to your cart yet.
        {'\n'}
        To do this, please return to the main page.
      </Text>
      <Image className='w-36 h-36' source={emptyCartImg} alt='Empty cart' />
      <Link href='/' className='' asChild>
        <Button>
          <ButtonText>Back</ButtonText>
        </Button>
      </Link>
    </View>
  );
};

export default EmptyCart;
