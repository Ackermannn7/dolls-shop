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
