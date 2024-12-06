import axios from 'axios';
import { useAuth } from '@/store/authStore';
import { fetchDoll } from './dolls';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items: any[]) {
  try {
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

export const getOrders = async () => {
  // @ts-ignore
  const token = useAuth.getState().token;

  const res = await axios.get(`${API_URL}/orders`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`, // Добавляем токен с Bearer схемой
    },
  });

  if (!res.status.toString().startsWith('2')) {
    throw new Error('Failed to fetch orders');
  }

  return res.data;
};

export async function getOrder(orderId: number) {
  try {
    // @ts-ignore
    const token = useAuth.getState().token;

    const { data: order } = await axios.get(`${API_URL}/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Добавляем токен с Bearer схемой
      },
    });

    // Получаем информацию о каждой кукле
    const itemsWithDollDetails = await Promise.all(
      order.items.map(async (item: any) => {
        const doll = await fetchDoll(item.dollId); // Используем ваш метод fetchDoll

        return {
          ...item,
          dollName: doll.dollName,
          dollImage: doll.image,
        };
      })
    );

    // Рассчитываем общую стоимость заказа
    const totalAmount = itemsWithDollDetails.reduce(
      (total: number, item: any) => total + item.price,
      0
    );

    return {
      ...order,
      items: itemsWithDollDetails,
      totalAmount,
    };
  } catch (error) {
    console.error('Failed to fetch order', error);
    throw new Error('Failed to fetch order');
  }
}
