import React, { useContext } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './ui/text';
import { Image } from './ui/image';
import { Link } from 'expo-router';
import { Button, ButtonText } from './ui/button';
// @ts-ignore
import emptyCartImg from '../assets/empty-cart-removebg-preview.png';
import DarkMode from '@/utils/darkmode.context';
const EmptyCart = () => {
  const { isDarkMode } = useContext(DarkMode);

  return (
    <View className='w-full h-full flex items-center justify-center'>
      <Text
        className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
      >
        The Cart is Empty!😕
      </Text>
      <Text
        className={`text-lg text-center ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
      >
        Looks like you haven't added anything to your cart yet.
        {'\n'}
        To do this, please return to the main page.
      </Text>
      <Image className='w-36 h-36' source={emptyCartImg} alt='Empty cart' />
      <Link href='/' className='max-w-36 w-full' asChild>
        <Button
          className={`w-full ${isDarkMode ? 'bg-[#f1f5f9]' : 'bg-[#262626]'} hover:${isDarkMode ? 'bg-[#262626]' : 'bg-[#f1f5f9]'}`}
        >
          <ButtonText
            className={`${isDarkMode ? 'text-[#262626]' : 'text-[#f1f5f9]'} hover:${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            Back
          </ButtonText>
        </Button>
      </Link>
    </View>
  );
};

export default EmptyCart;
