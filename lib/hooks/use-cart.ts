"use client"

import { useCallback, useEffect } from "react"
import { useCartStore } from "@/lib/store/cart-store"
import {
  getCartListApi,
  addToCartApi,
  updateCartApi,
  deleteCartApi,
} from "@/lib/api/cart"
import type { CartItem } from "@/types/cart"

export function useCart() {
  const {
    items,
    setItems,
    addItem,
    updateItemQuantity,
    removeItem: removeLocalItem,
    toggleCheck,
    toggleAllCheck,
    clearCart,
    checkedItems,
    checkedTotal,
    totalCount,
  } = useCartStore()

  const addToCart = useCallback(
    async (item: Omit<CartItem, "id" | "checked">) => {
      const optimisticItem: CartItem = {
        ...item,
        id: `temp-${Date.now()}`,
        checked: true,
      }
      addItem(optimisticItem)
      try {
        await addToCartApi(item.productId, item.quantity)
      } catch {
        removeLocalItem(optimisticItem.id)
      }
    },
    [addItem, removeLocalItem]
  )

  const updateQuantity = useCallback(
    async (id: string, quantity: number) => {
      const prev = items.find((item) => item.id === id)
      updateItemQuantity(id, quantity)
      try {
        await updateCartApi(id, quantity)
      } catch {
        if (prev) updateItemQuantity(id, prev.quantity)
      }
    },
    [items, updateItemQuantity]
  )

  const removeItem = useCallback(
    async (id: string) => {
      const prev = items.find((item) => item.id === id)
      removeLocalItem(id)
      try {
        await deleteCartApi(id)
      } catch {
        if (prev) addItem(prev)
      }
    },
    [items, addItem, removeLocalItem]
  )

  const syncCart = useCallback(async () => {
    try {
      const result = await getCartListApi()
      setItems(result.data)
    } catch {
      // keep local items if sync fails
    }
  }, [setItems])

  useEffect(() => {
    syncCart()
  }, [syncCart])

  return {
    items,
    totalCount,
    checkedItems,
    checkedTotal,
    addToCart,
    updateQuantity,
    removeItem,
    toggleCheck,
    toggleAllCheck,
    clearCart,
    syncCart,
  }
}
