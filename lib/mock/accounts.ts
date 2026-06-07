import type { UserRole } from '@/types/user'

export interface MockAccount {
  username: string
  password: string
  nickname: string
  avatar: string
  role: UserRole
  roleLabel: string
  description: string
}

export const mockAccounts: MockAccount[] = [
  {
    username: 'user',
    password: '123456',
    nickname: '茶道爱好者',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    role: 0,
    roleLabel: '普通用户',
    description: '可以浏览商品、下单购买、管理订单',
  },
  {
    username: 'merchant',
    password: '123456',
    nickname: '云栖茶庄',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    role: 1,
    roleLabel: '商家',
    description: '可以管理店铺、商品上下架、处理订单',
  },
  {
    username: 'admin',
    password: '123456',
    nickname: '系统管理员',
    avatar: 'https://picsum.photos/seed/avatar3/100/100',
    role: 2,
    roleLabel: '管理员',
    description: '可以管理用户、审核商品、处理反馈',
  },
]

export function findMockAccount(username: string, password: string): MockAccount | null {
  return mockAccounts.find((a) => a.username === username && a.password === password) || null
}
