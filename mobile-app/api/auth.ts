import { useAuth } from '@/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const logout = async (logoutFn: () => void) => {
  const logout = useAuth((s: any) => s.logout); // Получаем метод logout из Zustand
  logoutFn(); // Очищаем глобальное состояние
  await AsyncStorage.clear(); // Полностью очищаем AsyncStorage
};
