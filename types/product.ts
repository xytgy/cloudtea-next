export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  sales: number
  category: string
  description: string
}

export interface ProductDetail extends Product {
  images: string[]
  stock: number
  specs: ProductSpec[]
  detail: string
}

export interface ProductSpec {
  name: string
  values: string[]
}

export interface ProductReview {
  id: string
  userId: string
  username: string
  avatar: string
  rating: number
  content: string
  images: string[]
  createdAt: string
}

export interface ProductListParams {
  category?: string
  keyword?: string
  page?: number
  pageSize?: number
}
