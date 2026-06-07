import { axiosInstance } from './client'
import type { ApiResponse } from '@/types/api'
import type { Address, AddressFormParams } from '@/types/address'
import { mockAddresses } from '@/lib/mock'

const mockAddressStore = [...mockAddresses]

export async function getAddressListApi(): Promise<ApiResponse<Address[]>> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<Address[]>>('/api/proxy/user/address/list')
    return data
  } catch {
    return { code: 0, message: 'ok', data: [...mockAddressStore] }
  }
}

export async function addAddressApi(params: AddressFormParams): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/proxy/user/address/add', params)
    return data
  } catch {
    if (params.isDefault) {
      mockAddressStore.forEach((a) => (a.isDefault = false))
    }
    mockAddressStore.push({
      id: `a${Date.now()}`,
      ...params,
      isDefault: params.isDefault || false,
    })
    return { code: 0, message: 'ok', data: null }
  }
}

export async function updateAddressApi(params: AddressFormParams): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.post<ApiResponse<null>>('/api/proxy/user/address/update', params)
    return data
  } catch {
    if (params.id) {
      const index = mockAddressStore.findIndex((a) => a.id === params.id)
      if (index > -1) {
        if (params.isDefault) {
          mockAddressStore.forEach((a) => (a.isDefault = false))
        }
        mockAddressStore[index] = { ...mockAddressStore[index], ...params, isDefault: params.isDefault || false }
      }
    }
    return { code: 0, message: 'ok', data: null }
  }
}

export async function deleteAddressApi(id: string): Promise<ApiResponse<null>> {
  try {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(`/api/proxy/user/address/delete/${id}`)
    return data
  } catch {
    const index = mockAddressStore.findIndex((a) => a.id === id)
    if (index > -1) {
      mockAddressStore.splice(index, 1)
    }
    return { code: 0, message: 'ok', data: null }
  }
}
