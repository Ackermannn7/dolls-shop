import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  name: string;
  address?: string;
  avatarUrl?: string;
}

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
