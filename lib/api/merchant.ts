import { axiosInstance } from './client'
import type { ApiResponse } from '@/types/api'
import type {
  Shop,
  MerchantGoods,
  MerchantOrder,
  MerchantStats,
  GoodsStatus,
} from '@/lib/mock/merchant'
import {
  mockShop,
  mockMerchantGoods,
  mockMerchantOrders,
  mockMerchantStats,
} from '@/lib/mock/merchant'

const mockShopStore = { ...mockShop }
const mockGoodsStore = [...mockMerchantGoods]
const mockOrderStore = [...mockMerchantOrders]

export async function registerShopApi(params: {
  name: string
  licenseUrl: string
  description: string
}): Promise<ApiResponse<Shop>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<Shop>>('/api/merchant/register', params)
    return data
  } catch {
    mockShopStore.name = params.name
    mockShopStore.licenseUrl = params.licenseUrl
    mockShopStore.description = params.description
    mockShopStore.status = 'pending'
    return { code: 0, message: 'ok', data: { ...mockShopStore } }
  }
}

export async function getShopInfoApi(): Promise<ApiResponse<Shop>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<Shop>>('/api/merchant/shop')
    return data
  } catch {
    return { code: 0, message: 'ok', data: { ...mockShopStore } }
  }
}

export async function updateShopInfoApi(params: {
  name?: string
  description?: string
}): Promise<ApiResponse<Shop>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<Shop>>('/api/merchant/shop/update', params)
    return data
  } catch {
    if (params.name !== undefined) mockShopStore.name = params.name
    if (params.description !== undefined) mockShopStore.description = params.description
    return { code: 0, message: 'ok', data: { ...mockShopStore } }
  }
}

export async function getMerchantGoodsApi(params?: {
  keyword?: string
  status?: GoodsStatus
}): Promise<ApiResponse<MerchantGoods[]>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<MerchantGoods[]>>('/api/merchant/goods', { params })
    return data
  } catch {
    let filtered = [...mockGoodsStore]
    if (params?.keyword) {
      const kw = params.keyword.toLowerCase()
      filtered = filtered.filter((g) => g.name.toLowerCase().includes(kw))
    }
    if (params?.status) {
      filtered = filtered.filter((g) => g.status === params.status)
    }
    return { code: 0, message: 'ok', data: filtered }
  }
}

export async function updateGoodsStatusApi(params: {
  id: string
  status: GoodsStatus
}): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/merchant/goods/status', params)
    return data
  } catch {
    const goods = mockGoodsStore.find((g) => g.id === params.id)
    if (goods) goods.status = params.status
    return { code: 0, message: 'ok', data: null }
  }
}

export async function getMerchantOrdersApi(params?: {
  status?: number
}): Promise<ApiResponse<MerchantOrder[]>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<MerchantOrder[]>>('/api/merchant/orders', { params })
    return data
  } catch {
    let filtered = [...mockOrderStore]
    if (params?.status !== undefined) {
      filtered = filtered.filter((o) => o.status === params.status)
    }
    return { code: 0, message: 'ok', data: filtered }
  }
}

export async function shipOrderApi(params: {
  orderId: string
  trackingNo: string
}): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/merchant/orders/ship', params)
    return data
  } catch {
    const order = mockOrderStore.find((o) => o.id === params.orderId)
    if (order) {
      order.status = 2
      order.trackingNo = params.trackingNo
      order.shipTime = new Date().toISOString().replace('T', ' ').slice(0, 19)
    }
    return { code: 0, message: 'ok', data: null }
  }
}

export async function handleRefundApi(params: {
  orderId: string
  agree: boolean
  reason?: string
}): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/merchant/orders/refund', params)
    return data
  } catch {
    const order = mockOrderStore.find((o) => o.id === params.orderId)
    if (order) {
      order.status = params.agree ? 7 : 8
    }
    return { code: 0, message: 'ok', data: null }
  }
}
