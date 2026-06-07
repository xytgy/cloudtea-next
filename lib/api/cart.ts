import { axiosInstance } from './client'
import type { ApiResponse } from '@/types/api'
import type { CartItem } from '@/types/cart'
import { mockCartItems } from '@/lib/mock'

const mockCartStore = [...mockCartItems]

export async function getCartListApi(): Promise<ApiResponse<CartItem[]>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<CartItem[]>>('/api/proxy/cart/list')
    return data
  } catch {
    return { code: 0, message: 'ok', data: [...mockCartStore] }
  }
}

export async function addToCartApi(productId: string, quantity: number): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/proxy/cart/add', { productId, quantity })
    return data
  } catch {
    const existing = mockCartStore.find((item) => item.productId === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      const product = mockCartItems.find((item) => item.productId === productId)
      if (product) {
        mockCartStore.push({ ...product, id: `c${Date.now()}`, quantity })
      }
    }
    return { code: 0, message: 'ok', data: null }
  }
}

export async function updateCartApi(id: string, quantity: number): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/proxy/cart/update', { id, quantity })
    return data
  } catch {
    const item = mockCartStore.find((item) => item.id === id)
    if (item) {
      item.quantity = quantity
    }
    return { code: 0, message: 'ok', data: null }
  }
}

export async function deleteCartApi(id: string): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(`/api/proxy/cart/delete/${id}`)
    return data
  } catch {
    const index = mockCartStore.findIndex((item) => item.id === id)
    if (index > -1) {
      mockCartStore.splice(index, 1)
    }
    return { code: 0, message: 'ok', data: null }
  }
}
