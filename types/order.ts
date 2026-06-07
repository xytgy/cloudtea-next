export interface Order {
  id: string
  orderNo: string
  status: OrderStatus
  totalAmount: number
  payAmount: number
  freightAmount: number
  items: OrderItem[]
  address: OrderAddress
  createdAt: string
  payTime?: string
  shipTime?: string
  receiveTime?: string
}

export type OrderStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; color: string }> = {
  0: { label: '待支付', color: 'bg-yellow-100 text-yellow-800' },
  1: { label: '已支付', color: 'bg-blue-100 text-blue-800' },
  2: { label: '已发货', color: 'bg-purple-100 text-purple-800' },
  3: { label: '已完成', color: 'bg-green-100 text-green-800' },
  4: { label: '已评价', color: 'bg-stone-100 text-stone-800' },
  5: { label: '已取消', color: 'bg-stone-100 text-stone-600' },
  6: { label: '退款中', color: 'bg-orange-100 text-orange-800' },
  7: { label: '已退款', color: 'bg-red-100 text-red-800' },
  8: { label: '已拒绝', color: 'bg-red-100 text-red-800' },
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  spec: string
}

export interface OrderAddress {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
}

export interface CreateOrderParams {
  addressId: string
  cartItemIds: string[]
  remark?: string
}

export interface OrderListParams {
  status?: OrderStatus
  page?: number
  pageSize?: number
}

export interface ReviewParams {
  orderId: string
  rating: number
  content: string
  images?: string[]
}

export interface LogisticsInfo {
  orderId: string
  company: string
  trackingNo: string
  traces: LogisticsTrace[]
}

export interface LogisticsTrace {
  time: string
  description: string
}
