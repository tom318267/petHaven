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
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(0, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
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
