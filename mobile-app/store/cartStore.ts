import { create } from 'zustand';

export const useCart = create((set) => ({
  items: [],
  addDoll: (doll: any) => {
    set((state: any) => {
      const existingItem = state.items.find(
        (item: any) => item.doll.id === doll.id
      );
      return {
        items: existingItem
          ? state.items.map((item: any) =>
              item.doll.id === doll.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.items, { doll, quantity: 1 }],
      };
    });
  },
  resetCart: () => set({ items: [] }),
}));
