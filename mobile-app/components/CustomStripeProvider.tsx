import { fetchStripeKeys } from '@/api/stripe';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useQuery } from '@tanstack/react-query';

const CustomStripeProvider = ({ children }: any) => {
  const { data: stripeKeys } = useQuery({
    queryKey: ['stripe', 'keys'],
    queryFn: fetchStripeKeys,
  });
  console.log(stripeKeys);

  return (
    <StripeProvider publishableKey={stripeKeys?.publishableKey}>
      {children}
    </StripeProvider>
  );
};

export default CustomStripeProvider;
