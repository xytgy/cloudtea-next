import type { Order } from '@/types/order'

export type ShopStatus = 'active' | 'pending' | 'inactive'

export interface Shop {
  id: string
  name: string
  licenseUrl: string
  description: string
  status: ShopStatus
}

export type GoodsStatus = 'on_sale' | 'off_sale' | 'pending_review'

export interface MerchantGoods {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  sales: number
  stock: number
  category: string
  description: string
  status: GoodsStatus
}

export interface MerchantOrder {
  id: string
  orderNo: string
  status: Order['status']
  totalAmount: number
  buyerName: string
  buyerAvatar: string
  items: Order['items']
  address: Order['address']
  createdAt: string
  payTime?: string
  shipTime?: string
  trackingNo?: string
}

export interface MerchantStats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  todayOrders: number
}

export const mockShop: Shop = {
  id: 's1',
  name: '云栖茶庄',
  licenseUrl: 'https://picsum.photos/seed/license/600/400',
  description: '专注西湖龙井及浙江名茶二十年，源头直供品质保障。',
  status: 'active',
}

export const mockMerchantGoods: MerchantGoods[] = [
  {
    id: 'mg1',
    name: '西湖龙井',
    price: 398,
    originalPrice: 498,
    image: 'https://picsum.photos/seed/xihu-longjing/400/400',
    sales: 2341,
    stock: 200,
    category: '绿茶',
    description: '明前特级龙井，色绿香郁味甘形美，杭城西湖核心产区直供',
    status: 'on_sale',
  },
  {
    id: 'mg2',
    name: '碧螺春',
    price: 328,
    originalPrice: 428,
    image: 'https://picsum.photos/seed/biluochun/400/400',
    sales: 1876,
    stock: 150,
    category: '绿茶',
    description: '太湖洞庭山原产，卷曲如螺花果香浓郁，一芽一叶手工采摘',
    status: 'on_sale',
  },
  {
    id: 'mg3',
    name: '安溪铁观音',
    price: 258,
    originalPrice: 358,
    image: 'https://picsum.photos/seed/tieguanyin/400/400',
    sales: 3102,
    stock: 300,
    category: '乌龙',
    description: '正秋铁观音，传统工艺炭焙，兰花香韵持久回甘生津',
    status: 'on_sale',
  },
  {
    id: 'mg4',
    name: '武夷岩茶',
    price: 468,
    originalPrice: 568,
    image: 'https://picsum.photos/seed/wuyi-yancha/400/400',
    sales: 1543,
    stock: 80,
    category: '乌龙',
    description: '武夷山核心产区大红袍，岩骨花香三坑两涧正岩茶',
    status: 'off_sale',
  },
  {
    id: 'mg5',
    name: '正山小种',
    price: 198,
    originalPrice: 298,
    image: 'https://picsum.photos/seed/zhengshan/400/400',
    sales: 4210,
    stock: 500,
    category: '红茶',
    description: '桐木关传统松烟熏制，桂圆汤色蜜香甜韵世界红茶鼻祖',
    status: 'on_sale',
  },
  {
    id: 'mg6',
    name: '安吉白茶',
    price: 358,
    originalPrice: 458,
    image: 'https://picsum.photos/seed/anjibaicha/400/400',
    sales: 2100,
    stock: 160,
    category: '绿茶',
    description: '浙江安吉竹乡白叶一号，氨基酸含量极高鲜爽甘甜',
    status: 'pending_review',
  },
  {
    id: 'mg7',
    name: '金骏眉',
    price: 438,
    originalPrice: 588,
    image: 'https://picsum.photos/seed/jinjunmei/400/400',
    sales: 3560,
    stock: 100,
    category: '红茶',
    description: '武夷山桐木关全芽头金骏眉，蜜薯香馥郁汤色金黄透亮',
    status: 'on_sale',
  },
  {
    id: 'mg8',
    name: '老白茶饼',
    price: 288,
    originalPrice: 388,
    image: 'https://picsum.photos/seed/laobaicha/400/400',
    sales: 456,
    stock: 0,
    category: '白茶',
    description: '2018年福鼎老白茶饼，三年陈韵药香枣香渐显',
    status: 'off_sale',
  },
]

export const mockMerchantOrders: MerchantOrder[] = [
  {
    id: 'mo1',
    orderNo: 'CT20260607000001',
    status: 1,
    totalAmount: 796,
    buyerName: '张三',
    buyerAvatar: 'https://picsum.photos/seed/buyer1/100/100',
    items: [
      { id: 'oi1', productId: '1', name: '西湖龙井', price: 398, image: 'https://picsum.photos/seed/xihu-longjing/400/400', quantity: 2, spec: '100g' },
    ],
    address: { name: '张三', phone: '138****8888', province: '浙江省', city: '杭州市', district: '西湖区', detail: '龙井路1号' },
    createdAt: '2026-06-07 10:30:00',
    payTime: '2026-06-07 10:35:00',
  },
  {
    id: 'mo2',
    orderNo: 'CT20260606000001',
    status: 2,
    totalAmount: 586,
    buyerName: '李四',
    buyerAvatar: 'https://picsum.photos/seed/buyer2/100/100',
    items: [
      { id: 'oi2', productId: '2', name: '碧螺春', price: 328, image: 'https://picsum.photos/seed/biluochun/400/400', quantity: 1, spec: '125g' },
      { id: 'oi3', productId: '5', name: '正山小种', price: 198, image: 'https://picsum.photos/seed/zhengshan/400/400', quantity: 1, spec: '100g' },
    ],
    address: { name: '李四', phone: '139****6666', province: '上海市', city: '上海市', district: '浦东新区', detail: '陆家嘴环路100号' },
    createdAt: '2026-06-06 14:20:00',
    payTime: '2026-06-06 14:25:00',
    shipTime: '2026-06-06 16:00:00',
    trackingNo: 'SF1234567890',
  },
  {
    id: 'mo3',
    orderNo: 'CT20260605000001',
    status: 3,
    totalAmount: 258,
    buyerName: '王五',
    buyerAvatar: 'https://picsum.photos/seed/buyer3/100/100',
    items: [
      { id: 'oi4', productId: '3', name: '安溪铁观音', price: 258, image: 'https://picsum.photos/seed/tieguanyin/400/400', quantity: 1, spec: '250g' },
    ],
    address: { name: '王五', phone: '137****5555', province: '北京市', city: '北京市', district: '朝阳区', detail: '三里屯路10号' },
    createdAt: '2026-06-05 09:10:00',
    payTime: '2026-06-05 09:15:00',
    shipTime: '2026-06-05 14:00:00',
    trackingNo: 'YTO9876543210',
  },
  {
    id: 'mo4',
    orderNo: 'CT20260604000001',
    status: 6,
    totalAmount: 438,
    buyerName: '赵六',
    buyerAvatar: 'https://picsum.photos/seed/buyer4/100/100',
    items: [
      { id: 'oi5', productId: '7', name: '金骏眉', price: 438, image: 'https://picsum.photos/seed/jinjunmei/400/400', quantity: 1, spec: '100g' },
    ],
    address: { name: '赵六', phone: '136****4444', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园路10号' },
    createdAt: '2026-06-04 11:00:00',
    payTime: '2026-06-04 11:05:00',
  },
  {
    id: 'mo5',
    orderNo: 'CT20260603000001',
    status: 0,
    totalAmount: 198,
    buyerName: '孙七',
    buyerAvatar: 'https://picsum.photos/seed/buyer5/100/100',
    items: [
      { id: 'oi6', productId: '5', name: '正山小种', price: 198, image: 'https://picsum.photos/seed/zhengshan/400/400', quantity: 1, spec: '250g' },
    ],
    address: { name: '孙七', phone: '135****3333', province: '江苏省', city: '南京市', district: '鼓楼区', detail: '中山路10号' },
    createdAt: '2026-06-03 08:40:00',
  },
  {
    id: 'mo6',
    orderNo: 'CT20260602000001',
    status: 1,
    totalAmount: 876,
    buyerName: '周八',
    buyerAvatar: 'https://picsum.photos/seed/buyer6/100/100',
    items: [
      { id: 'oi7', productId: '3', name: '安溪铁观音', price: 258, image: 'https://picsum.photos/seed/tieguanyin/400/400', quantity: 2, spec: '250g' },
      { id: 'oi8', productId: '1', name: '西湖龙井', price: 398, image: 'https://picsum.photos/seed/xihu-longjing/400/400', quantity: 1, spec: '100g' },
    ],
    address: { name: '周八', phone: '134****2222', province: '四川省', city: '成都市', district: '武侯区', detail: '人民路10号' },
    createdAt: '2026-06-02 16:20:00',
    payTime: '2026-06-02 16:25:00',
  },
]

export const mockMerchantStats: MerchantStats = {
  totalOrders: 1256,
  totalRevenue: 498760,
  pendingOrders: 3,
  todayOrders: 12,
}
