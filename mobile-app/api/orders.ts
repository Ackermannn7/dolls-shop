import axios from 'axios';
import { useAuth } from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items: any[]) {
  try {
    console.log(items);

    // Получение токена из Zustand
    // @ts-ignore
    const token = useAuth.getState().token;

    // Отправка POST-запроса через Axios
    const response = await axios.post(
      `${API_URL}/orders`,
      { order: {}, items },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Добавляем токен с Bearer схемой
        },
      }
    );

    return response.data;
  } catch (error: any) {
    // Обработка ошибок
    console.error(
      'Error creating order:',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || 'Error creating order');
  }
}
