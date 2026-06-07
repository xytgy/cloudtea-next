import { axiosInstance } from './client'
import type { ApiResponse } from '@/types/api'
import type { PaginatedData } from '@/types/api'
import type {
  Order,
  CreateOrderParams,
  OrderListParams,
  ReviewParams,
  LogisticsInfo,
} from '@/types/order'
import { mockOrders, mockCartItems } from '@/lib/mock'

const mockOrderStore = [...mockOrders]

export async function createOrderApi(params: CreateOrderParams): Promise<ApiResponse<Order>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<Order>>('/api/order/create', params)
    return data
  } catch {
    const items = params.cartItemIds
      .map((cartId) => {
        const cartItem = mockCartItems.find((c) => c.id === cartId)
        return cartItem
          ? {
              id: `oi${Date.now()}`,
              productId: cartItem.productId,
              name: cartItem.name,
              price: cartItem.price,
              image: cartItem.image,
              quantity: cartItem.quantity,
              spec: cartItem.spec,
            }
          : null
      })
      .filter(Boolean)
    const totalAmount = items.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0)
    const newOrder: Order = {
      id: `o${Date.now()}`,
      orderNo: `CT${new Date().toISOString().slice(0, 10).replace(/-/g, '')}000001`,
      status: 0,
      totalAmount,
      payAmount: totalAmount,
      freightAmount: 0,
      items: items as Order['items'],
      address: {
        name: '张三',
        phone: '13888888888',
        province: '浙江省',
        city: '杭州市',
        district: '西湖区',
        detail: '龙井路1号',
      },
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    }
    mockOrderStore.unshift(newOrder)
    return { code: 0, message: 'ok', data: newOrder }
  }
}

export async function getOrderListApi(params?: OrderListParams): Promise<ApiResponse<PaginatedData<Order>>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedData<Order>>>('/api/proxy/order/list', { params })
    return data
  } catch {
    let filtered = [...mockOrderStore]
    if (params?.status !== undefined) {
      filtered = filtered.filter((o) => o.status === params.status)
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    const list = filtered.slice(start, start + pageSize)
    return {
      code: 0,
      message: 'ok',
      data: { list, total: filtered.length, page, pageSize },
    }
  }
}

export async function getOrderDetailApi(id: string): Promise<ApiResponse<Order>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<Order>>('/api/proxy/order/detail', { params: { id } })
    return data
  } catch {
    const order = mockOrderStore.find((o) => o.id === id) || mockOrderStore[0]
    return { code: 0, message: 'ok', data: order }
  }
}

export async function cancelOrderApi(id: string): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>(`/api/proxy/order/cancel/${id}`)
    return data
  } catch {
    const order = mockOrderStore.find((o) => o.id === id)
    if (order) {
      order.status = 5
    }
    return { code: 0, message: 'ok', data: null }
  }
}

export async function confirmOrderApi(id: string): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>(`/api/proxy/order/confirm/${id}`)
    return data
  } catch {
    const order = mockOrderStore.find((o) => o.id === id)
    if (order) {
      order.status = 3
      order.receiveTime = new Date().toISOString().replace('T', ' ').slice(0, 19)
    }
    return { code: 0, message: 'ok', data: null }
  }
}

export async function refundOrderApi(id: string): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>(`/api/proxy/order/refund/${id}`)
    return data
  } catch {
    const order = mockOrderStore.find((o) => o.id === id)
    if (order) {
      order.status = 6
    }
    return { code: 0, message: 'ok', data: null }
  }
}

export async function submitReviewApi(params: ReviewParams): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/proxy/order/review', params)
    return data
  } catch {
    const order = mockOrderStore.find((o) => o.id === params.orderId)
    if (order) {
      order.status = 4
    }
    return { code: 0, message: 'ok', data: null }
  }
}

export async function getLogisticsApi(orderId: string): Promise<ApiResponse<LogisticsInfo>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<LogisticsInfo>>('/api/proxy/order/logistics', { params: { orderId } })
    return data
  } catch {
    return {
      code: 0,
      message: 'ok',
      data: {
        orderId,
        company: '顺丰速运',
        trackingNo: 'SF1234567890',
        traces: [
          { time: '2026-06-02 08:00:00', description: '快件已从杭州转运中心发出' },
          { time: '2026-06-01 22:00:00', description: '快件已到达杭州转运中心' },
          { time: '2026-06-01 16:00:00', description: '快件已从商家处揽收' },
        ],
      },
    }
  }
}
