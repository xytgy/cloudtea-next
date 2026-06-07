export type UserRole = 0 | 1 | 2

export type Gender = 0 | 1 | 2

export interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  phone: string
  gender: Gender
  role: UserRole
  shopId?: string
}

export interface User extends UserInfo {
  token?: string
}
