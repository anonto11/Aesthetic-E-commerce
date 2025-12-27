// Cart Store — Persistent shopping cart with localStorage
// Uses a simple pub/sub pattern for reactivity across components

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  artist: string;
  quantity: number;
}

type CartListener = () => void;

const CART_STORAGE_KEY = 'Hasan-fragments-cart';

class CartStore {
  private items: CartItem[] = [];
  private listeners: Set<CartListener> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        this.items = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load cart from storage:', e);
      this.items = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn('Failed to save cart to storage:', e);
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: CartListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  addItem(item: Omit<CartItem, 'quantity'>, quantity: number = 1) {
    const existingIndex = this.items.findIndex(i => i.id === item.id);
    
    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({ ...item, quantity });
    }
    
    this.saveToStorage();
    this.notify();
  }

  updateQuantity(id: string, quantity: number) {
    const index = this.items.findIndex(i => i.id === id);
    if (index >= 0) {
      if (quantity <= 0) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity = quantity;
      }
      this.saveToStorage();
      this.notify();
    }
  }

  removeItem(id: string) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveToStorage();
    this.notify();
  }

  clear() {
    this.items = [];
    this.saveToStorage();
    this.notify();
  }
}

export const cartStore = new CartStore();

// React hook for cart state
import { useState, useEffect } from 'react';

export function useCart() {
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    return cartStore.subscribe(() => forceUpdate({}));
  }, []);

  return {
    items: cartStore.getItems(),
    itemCount: cartStore.getItemCount(),
    subtotal: cartStore.getSubtotal(),
    addItem: cartStore.addItem.bind(cartStore),
    updateQuantity: cartStore.updateQuantity.bind(cartStore),
    removeItem: cartStore.removeItem.bind(cartStore),
    clear: cartStore.clear.bind(cartStore),
  };
}
