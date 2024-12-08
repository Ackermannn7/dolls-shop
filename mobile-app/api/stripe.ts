import axios from 'axios';
import { useAuth } from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchStripeKeys = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/stripe/keys`);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error: ${error.response?.status}`);
      throw new Error(
        error.response?.data?.message || 'Unknown error occurred'
      );
    } else {
      console.error('Unexpected error', error);
      throw new Error('Unexpected error');
    }
  }
};

export const createPaymentIntent = async ({ orderId }: { orderId: string }) => {
  // @ts-ignore
  const token = useAuth.getState().token;
  try {
    console.log('Token:', token);

    const { data } = await axios.post(
      `${API_URL}/stripe/payment-intent`,

      { orderId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error: ${error.response?.status}`);
      throw new Error(
        error.response?.data?.message || 'Unknown error occurred'
      );
    } else {
      console.error('Unexpected error', error);
      throw new Error('Unexpected error');
    }
  }
};
