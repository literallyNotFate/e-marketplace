import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

const useCart = create(
    persist((set) => ({
    items: [],

    totalAmount: (items) =>
        items.reduce((total, item) => total + item.price * item.quantity, 0),

    totalItems: (items) =>
        items.reduce((total, item) => total + item.quantity, 0),

    addToCart: (product) => {
        set((state) => ({
            items: state.items.some((item) => item.id === product.id)
            ? state.items.map((item) =>
                item.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + 1, item.limit) }
                : item
            )
            : [...state.items, { ...product, quantity: 1, limit: product.quantity }],
        }));
    },

    removeFromCart: (productId) => {
        set((state) => ({
        items: state.items
            .map((item) =>
            item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
    },
    
    clearCart: () => {
        set({ items: [] });
    },
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
}));

export default useCart;
