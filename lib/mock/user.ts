import type { UserInfo } from '@/types/user'

export const mockUser: UserInfo = {
  id: '1',
  username: 'tea_lover',
  nickname: '茶道爱好者',
  avatar: 'https://picsum.photos/seed/avatar1/100/100',
  phone: '138****8888',
  gender: 1,
  role: 0,
  shopId: undefined,
}

export const mockAuthUser = {
  id: '1',
  username: 'tea_lover',
  nickname: '茶道爱好者',
  avatar: 'https://picsum.photos/seed/avatar1/100/100',
  phone: '138****8888',
  email: 'tea_lover@example.com',
}
