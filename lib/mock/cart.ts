import type { CartItem } from '@/types/cart'

export const mockCartItems: CartItem[] = [
  {
    id: 'c1',
    productId: '1',
    name: '西湖龙井',
    price: 398,
    image: 'https://picsum.photos/seed/xihu-longjing/400/400',
    quantity: 1,
    spec: '100g',
    stock: 200,
    checked: true,
  },
  {
    id: 'c2',
    productId: '5',
    name: '正山小种',
    price: 198,
    image: 'https://picsum.photos/seed/zhengshan/400/400',
    quantity: 2,
    spec: '250g',
    stock: 500,
    checked: true,
  },
  {
    id: 'c3',
    productId: '9',
    name: '老班章',
    price: 798,
    image: 'https://picsum.photos/seed/laobanzhang/400/400',
    quantity: 1,
    spec: '357g饼',
    stock: 30,
    checked: false,
  },
]
