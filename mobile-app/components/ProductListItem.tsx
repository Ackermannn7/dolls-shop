import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';

export default function ProductListItem({ product }) {
  return (
    <Card className='p-5 rounded-lg max-w-[360px] flex-1'>
      <Image
        source={{
          uri: product.image,
        }}
        className='mb-6 h-[240px] w-full rounded-md'
        alt={`${product.name} image`}
        resizeMode='contain'
      />
      <Text className='text-center text-sm font-normal mb-2 text-typography-700'>
        {product.name}
      </Text>
      <Heading size='md' className='mb-4 text-center'>
        ${product.price}
      </Heading>
    </Card>
  );
}
