import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const STORAGE_KEY = "cartData";

const readCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

export interface BookingCart {
  cartItems: CartItem[];
  onAdd: (input: CartItem) => void;
  onRemove: (input: CartItem) => void;
  onDelete: (input: CartItem) => void;
  onDeleteAll: () => void;
  totalPrice: number;
  totalDuration: number;
}

const useBookingCart = (): BookingCart => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);

  const persist = (next: CartItem[]) => {
    setCartItems(next);
    if (next.length === 0) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const onAdd = (input: CartItem) => {
    const exist = cartItems.find((item) => item._id === input._id);

    if (exist) {
      persist(
        cartItems.map((item) =>
          item._id === input._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      persist([...cartItems, { ...input, quantity: input.quantity || 1 }]);
    }
  };

  const onRemove = (input: CartItem) => {
    const exist = cartItems.find((item) => item._id === input._id);
    if (!exist) return;

    if (exist.quantity <= 1) {
      persist(cartItems.filter((item) => item._id !== input._id));
    } else {
      persist(
        cartItems.map((item) =>
          item._id === input._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const onDelete = (input: CartItem) => {
    persist(cartItems.filter((item) => item._id !== input._id));
  };

  const onDeleteAll = () => persist([]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalDuration = cartItems.reduce(
    (sum, item) => sum + (item.duration || 0) * item.quantity,
    0
  );

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    totalPrice,
    totalDuration,
  };
};

export default useBookingCart;
