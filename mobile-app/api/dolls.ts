import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const listDolls = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/dolls`);
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

export const fetchDoll = async (id: number) => {
  try {
    const { data } = await axios.get(`${API_URL}/dolls/${id}`);
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
