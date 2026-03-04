
'use client';

import { useState, useEffect } from 'react';
import { Dish } from '@/lib/mock-data';

export type CartItem = Dish & { quantity: number };

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('foodly-king-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('foodly-king-cart', JSON.stringify(newCart));
  };

  const addToCart = (dish: Dish) => {
    const existingIndex = cart.findIndex(item => item.id === dish.id);
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      saveCart(newCart);
    } else {
      saveCart([...cart, { ...dish, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice };
}
