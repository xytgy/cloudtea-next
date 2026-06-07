export interface TeaPost {
  id: string
  author: { id: string; nickname: string; avatar: string; level?: number }
  content: string
  images: string[]
  topics: string[]
  likeCount: number
  commentCount: number
  isLiked: boolean
  isFollowing: boolean
  createdAt: string
}

export interface Comment {
  id: string
  author: { id: string; nickname: string; avatar: string }
  content: string
  createdAt: string
  replyTo?: { id: string; nickname: string }
  children?: Comment[]
}

export interface Topic {
  id: string
  name: string
  title: string
  description: string
  postCount: number
  viewCount: number
  isHot: boolean
}

export interface UserProfile {
  id: string
  nickname: string
  avatar: string
  signature: string
  followerCount: number
  followingCount: number
  likeCount: number
  postCount: number
  isFollowing: boolean
}
