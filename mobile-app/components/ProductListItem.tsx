import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

export default function ProductListItem({ doll }: any) {
  return (
    <Link href={`/doll/${doll.id}`} asChild>
      <Pressable className='flex-1'>
        <Card className='p-3 rounded-lg flex-1'>
          <Image
            source={{
              uri: doll.image,
            }}
            className='mb-6 max-w-[450px] aspect-square w-full rounded-md'
            alt={`${doll.dollName} image`}
            resizeMode='contain'
          />
          <Text className=' text-sm font-normal mb-2 text-typography-700'>
            {doll.dollName}
          </Text>
          <Heading size='md' className='mb-4 '>
            ${doll.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
