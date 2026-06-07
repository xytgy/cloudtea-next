import type { ApiResponse } from '@/types/api'
import type { PaginatedData } from '@/types/api'
import type { Product, ProductDetail, ProductReview, ProductListParams } from '@/types/product'
import { mockProducts, mockProductDetails, getMockProductReviews } from '@/lib/mock'

function isServer() {
  return typeof window === 'undefined'
}

function buildQueryString(params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return ''
  const entries = Object.entries(params).filter(([, v]) => v !== undefined)
  if (entries.length === 0) return ''
  return '?' + entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join('&')
}

async function proxyFetch<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<ApiResponse<T>> {
  const qs = buildQueryString(params)
  if (isServer()) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || cookieStore.get('cloudtea-token')?.value
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers.Authorization = `Bearer ${token}`
    const res = await fetch(`http://localhost:3000/api/proxy${path}${qs}`, {
      headers,
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data.code !== 0) throw new Error(data.message)
    return data as ApiResponse<T>
  } else {
    const { axiosInstance } = await import('./client')
    const { data } = await axiosInstance.get<ApiResponse<T>>(`/api/proxy${path}`, { params })
    return data
  }
}

export async function getProductsApi(params?: ProductListParams): Promise<ApiResponse<PaginatedData<Product>>> {
  try {
    return await proxyFetch<PaginatedData<Product>>('/product/list', {
      category: params?.category,
      keyword: params?.keyword,
      page: params?.page,
      pageSize: params?.pageSize,
    })
  } catch {
    let filtered = [...mockProducts]
    if (params?.category) {
      filtered = filtered.filter((p) => p.category === params.category)
    }
    if (params?.keyword) {
      const kw = params.keyword.toLowerCase()
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw))
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

export async function getProductDetailApi(id: string): Promise<ApiResponse<ProductDetail>> {
  try {
    return await proxyFetch<ProductDetail>('/product/detail', { id })
  } catch {
    const detail = mockProductDetails[id] || {
      ...mockProducts.find((p) => p.id === id) || mockProducts[0],
      images: [
        `https://picsum.photos/seed/product-${id}-1/400/400`,
        `https://picsum.photos/seed/product-${id}-2/400/400`,
        `https://picsum.photos/seed/product-${id}-3/400/400`,
      ],
      stock: 100,
      specs: [{ name: '规格', values: ['100g', '250g'] }],
      detail: '暂无详细描述，请参考商品简介。',
    }
    return { code: 0, message: 'ok', data: detail }
  }
}

export async function getProductReviewsApi(id: string): Promise<ApiResponse<ProductReview[]>> {
  try {
    return await proxyFetch<ProductReview[]>('/product/reviews', { id })
  } catch {
    return { code: 0, message: 'ok', data: getMockProductReviews(id) }
  }
}
