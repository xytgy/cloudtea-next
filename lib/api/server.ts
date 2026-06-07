import { cookies } from 'next/headers'
import type { ApiResponse } from '@/types/api'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data: ApiResponse<T> = await response.json()
  if (data.code !== 0) {
    throw new Error(data.message || '请求失败')
  }
  return data
}

export async function apiGet<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> {
  const url = new URL(`/api/proxy${path}`, BASE_URL || 'http://localhost:3000')
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }
  const headers = await getAuthHeaders()
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers,
    cache: 'no-store',
  })
  return handleResponse<T>(response)
}

export async function apiPost<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  const headers = await getAuthHeaders()
  const response = await fetch(`${BASE_URL || ''}/api/proxy${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  return handleResponse<T>(response)
}

export async function apiPut<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  const headers = await getAuthHeaders()
  const response = await fetch(`${BASE_URL || ''}/api/proxy${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })
  return handleResponse<T>(response)
}

export async function apiDelete<T>(path: string): Promise<ApiResponse<T>> {
  const headers = await getAuthHeaders()
  const response = await fetch(`${BASE_URL || ''}/api/proxy${path}`, {
    method: 'DELETE',
    headers,
  })
  return handleResponse<T>(response)
}
