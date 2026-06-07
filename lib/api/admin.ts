import { axiosInstance } from './client'
import type { ApiResponse } from '@/types/api'
import {
  mockUsers,
  mockAuditGoods,
  mockFeedbackList,
  type AdminUser,
  type AdminRole,
  type AdminStatus,
  type AuditGoods,
  type AuditStatus,
  type FeedbackItem,
  type FeedbackStatus,
} from '@/lib/mock/admin'

let localUsers = [...mockUsers]
let localAuditGoods = [...mockAuditGoods]
let localFeedbackList = [...mockFeedbackList]

export async function getUserListApi(params?: { keyword?: string }): Promise<ApiResponse<AdminUser[]>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<AdminUser[]>>('/api/proxy/admin/users', { params })
    return data
  } catch {
    let list = [...localUsers]
    if (params?.keyword) {
      const kw = params.keyword.toLowerCase()
      list = list.filter(
        (u) => u.username.toLowerCase().includes(kw) || u.nickname.toLowerCase().includes(kw) || u.phone.includes(kw)
      )
    }
    return { code: 0, message: 'ok', data: list }
  }
}

export async function addUserApi(params: {
  username: string
  nickname: string
  role: AdminRole
  phone: string
  password: string
}): Promise<ApiResponse<AdminUser>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<AdminUser>>('/api/proxy/admin/users', params)
    return data
  } catch {
    const newUser: AdminUser = {
      id: `u${Date.now()}`,
      username: params.username,
      nickname: params.nickname || params.username,
      role: params.role,
      phone: params.phone,
      status: 'enabled',
      createdAt: new Date().toISOString().slice(0, 10),
    }
    localUsers.unshift(newUser)
    return { code: 0, message: 'ok', data: newUser }
  }
}

export async function updateUserStatusApi(params: {
  id: string
  status: AdminStatus
}): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/proxy/admin/users/status', params)
    return data
  } catch {
    localUsers = localUsers.map((u) => (u.id === params.id ? { ...u, status: params.status } : u))
    return { code: 0, message: 'ok', data: null }
  }
}

export async function getAuditGoodsApi(): Promise<ApiResponse<AuditGoods[]>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<AuditGoods[]>>('/api/proxy/admin/audit')
    return data
  } catch {
    return { code: 0, message: 'ok', data: localAuditGoods.filter((g) => g.status === 'pending') }
  }
}

export async function auditGoodsApi(params: {
  id: string
  status: AuditStatus
  reason?: string
}): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/proxy/admin/audit', params)
    return data
  } catch {
    localAuditGoods = localAuditGoods.map((g) =>
      g.id === params.id ? { ...g, status: params.status } : g
    )
    return { code: 0, message: 'ok', data: null }
  }
}

export async function getFeedbackListApi(): Promise<ApiResponse<FeedbackItem[]>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<FeedbackItem[]>>('/api/proxy/admin/feedback')
    return data
  } catch {
    return { code: 0, message: 'ok', data: [...localFeedbackList] }
  }
}

export async function updateFeedbackStatusApi(params: {
  id: string
  status: FeedbackStatus
}): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/proxy/admin/feedback/status', params)
    return data
  } catch {
    localFeedbackList = localFeedbackList.map((f) =>
      f.id === params.id ? { ...f, status: params.status } : f
    )
    return { code: 0, message: 'ok', data: null }
  }
}
