import { axiosInstance } from './client'
import type { ApiResponse } from '@/types/api'
import type { LoginResult, LoginParams, RegisterParams, UserInfo } from '@/types/auth'
import { findMockAccount } from '@/lib/mock/accounts'

export async function loginApi(params: LoginParams): Promise<ApiResponse<LoginResult>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<LoginResult>>('/api/proxy/auth/login', params)
    return data
  } catch {
    const account = findMockAccount(params.username, params.password)
    if (!account) {
      return {
        code: -1,
        message: '用户名或密码错误',
        data: {} as LoginResult,
      }
    }
    return {
      code: 0,
      message: 'ok',
      data: {
        accessToken: `mock-token-${account.username}-${Date.now()}`,
        refreshToken: `mock-refresh-${account.username}-${Date.now()}`,
        userInfo: {
          id: String(account.role),
          username: account.username,
          nickname: account.nickname,
          avatar: account.avatar,
          phone: '138****8888',
          email: `${account.username}@cloudtea.com`,
        } as UserInfo,
      },
    }
  }
}

export async function registerApi(params: RegisterParams): Promise<ApiResponse<UserInfo>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<UserInfo>>('/api/proxy/auth/register', params)
    return data
  } catch {
    return {
      code: 0,
      message: 'ok',
      data: {
        id: String(Date.now()),
        username: params.username,
        nickname: params.username,
        avatar: `https://picsum.photos/seed/${params.username}/100/100`,
        phone: params.phone || '',
        email: `${params.username}@cloudtea.com`,
      } as UserInfo,
    }
  }
}
