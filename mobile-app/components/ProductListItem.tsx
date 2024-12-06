import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { useContext } from 'react';
import DarkMode from '@/utils/darkmode.context';

export default function ProductListItem({ doll }: any) {
  const { isDarkMode } = useContext(DarkMode);

  return (
    <Link href={`/doll/${doll.id}`} asChild>
      <Pressable className='flex-1'>
        <Card
          className={`p-3 rounded-lg flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
        >
          <Image
            source={{
              uri: doll.image,
            }}
            className='mb-6 max-w-[450px] aspect-square w-full rounded-md'
            alt={`${doll.dollName} image`}
            resizeMode='contain'
          />
          <Text
            className={`text-lg font-normal mb-2 text-typography-700 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            {doll.dollName}
          </Text>
          <Heading
            size='md'
            className={`mb-4 ${isDarkMode ? 'text-[#f1f5f9]' : 'text-[#262626]'}`}
          >
            ${doll.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
