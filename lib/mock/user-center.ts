import type { Product } from '@/types/product'

export interface UserProfile {
  avatar: string
  nickname: string
  signature: string
  phone: string
  gender: 0 | 1 | 2
  stats: {
    orders: number
    favorites: number
    consultations: number
  }
}

export type SupportStatus = 'pending' | 'replied' | 'resolved'

export interface SupportItem {
  id: string
  title: string
  content: string
  category: string
  status: SupportStatus
  createdAt: string
  reply?: string
}

export const mockUserProfile: UserProfile = {
  avatar: 'https://picsum.photos/seed/avatar1/200/200',
  nickname: '茶道爱好者',
  signature: '一盏清茶，品味人生',
  phone: '138****8888',
  gender: 1,
  stats: {
    orders: 12,
    favorites: 4,
    consultations: 3,
  },
}

export const mockFavorites: Product[] = [
  {
    id: '1',
    name: '西湖龙井',
    price: 398,
    originalPrice: 498,
    image: 'https://picsum.photos/seed/xihu-longjing/400/400',
    sales: 2341,
    category: '绿茶',
    description: '明前特级龙井，色绿香郁味甘形美，杭城西湖核心产区直供',
  },
  {
    id: '5',
    name: '正山小种',
    price: 198,
    originalPrice: 298,
    image: 'https://picsum.photos/seed/zhengshan/400/400',
    sales: 4210,
    category: '红茶',
    description: '桐木关传统松烟熏制，桂圆汤色蜜香甜韵世界红茶鼻祖',
  },
  {
    id: '9',
    name: '老班章',
    price: 798,
    originalPrice: 998,
    image: 'https://picsum.photos/seed/laobanzhang/400/400',
    sales: 654,
    category: '普洱',
    description: '布朗山老班章古树纯料，茶气霸道苦涩回甘猛烈王者之韵',
  },
  {
    id: '7',
    name: '白毫银针',
    price: 528,
    originalPrice: 688,
    image: 'https://picsum.photos/seed/baihao-yinzhen/400/400',
    sales: 987,
    category: '白茶',
    description: '福鼎太姥山头采银针，满披白毫如银似雪毫香蜜韵',
  },
]

export const mockSupportList: SupportItem[] = [
  {
    id: 's1',
    title: '西湖龙井冲泡水温咨询',
    content: '请问这款明前龙井最适宜的冲泡水温是多少？用玻璃杯还是盖碗更好？',
    category: '冲泡方法',
    status: 'replied',
    createdAt: '2026-06-01 14:30',
    reply: '您好！西湖龙井建议使用80-85℃水温，玻璃杯冲泡可观赏芽叶舒展，盖碗冲泡更能控制浓度。推荐玻璃杯3g茶叶配200ml水，浸泡2-3分钟即可。',
  },
  {
    id: 's2',
    title: '老班章存放条件',
    content: '买了两饼老班章打算存放，请问家庭存放有什么需要注意的？',
    category: '茶叶保存',
    status: 'resolved',
    createdAt: '2026-05-28 09:15',
    reply: '您好！普洱茶家庭存放建议选择通风、干燥、无异味的环境，避免阳光直射。温度20-30℃，湿度40%-70%为宜。可以用纸箱或紫砂罐存放，定期翻动检查。',
  },
  {
    id: 's3',
    title: '发票开具咨询',
    content: '公司采购需要开发票，请问如何申请增值税专用发票？',
    category: '售后服务',
    status: 'pending',
    createdAt: '2026-06-05 16:20',
  },
  {
    id: 's4',
    title: '铁观音保质期问题',
    content: '清香型铁观音的保质期是多久？需要放冰箱保存吗？',
    category: '茶叶保存',
    status: 'replied',
    createdAt: '2026-05-25 11:40',
    reply: '您好！清香型铁观音建议冷藏保存，保质期一般为18-24个月。浓香型和陈香型则不需要冷藏，常温密封保存即可。',
  },
  {
    id: 's5',
    title: '白毫银针与白牡丹区别',
    content: '这两种白茶有什么区别？送礼选哪个更合适？',
    category: '产品咨询',
    status: 'resolved',
    createdAt: '2026-05-20 08:50',
    reply: '您好！白毫银针只采单芽，等级更高，口感更鲜爽清甜；白牡丹为一芽一二叶，花香更丰富，性价比更高。送礼建议白毫银针更显档次，自饮品鉴两者皆宜。',
  },
]
