import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  userId: string;
}

interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return { items: [] };
};

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const { id, name, price, image, userId } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, name, price, image, userId, quantity: 1 });
      }
      // Update local storage after adding to cart
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Update local storage after removing from cart
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          // Automatically remove item if quantity is set to 0
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
      // Update local storage after quantity change
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.items = [];
      // Update local storage after clearing cart
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      // Update local storage when setting cart
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify({ items: action.payload }));
      }
    },
    initializeCart: (state) => {
      const loadedState = loadCartFromLocalStorage();
      if (JSON.stringify(state.items) !== JSON.stringify(loadedState.items)) {
        state.items = loadedState.items;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  setCart,
  clearCart,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
