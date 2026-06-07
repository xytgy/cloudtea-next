export type AdminRole = 'user' | 'merchant' | 'admin'
export type AdminStatus = 'enabled' | 'disabled'

export interface AdminUser {
  id: string
  username: string
  nickname: string
  role: AdminRole
  phone: string
  status: AdminStatus
  createdAt: string
}

export type AuditStatus = 'pending' | 'approved' | 'rejected'

export interface AuditGoods {
  id: string
  name: string
  price: number
  image: string
  merchant: string
  submittedAt: string
  status: AuditStatus
}

export type FeedbackStatus = 'pending' | 'processed' | 'ignored'
export type FeedbackType = '投诉' | '建议' | '咨询' | 'BUG反馈'

export interface FeedbackItem {
  id: string
  username: string
  type: FeedbackType
  content: string
  status: FeedbackStatus
  createdAt: string
}

export const mockUsers: AdminUser[] = [
  { id: 'u1', username: 'zhangwei', nickname: '张伟', role: 'admin', phone: '138****1001', status: 'enabled', createdAt: '2025-01-15' },
  { id: 'u2', username: 'liuyang', nickname: '刘洋', role: 'admin', phone: '139****2002', status: 'enabled', createdAt: '2025-02-20' },
  { id: 'u3', username: 'wangcha', nickname: '王茶商', role: 'merchant', phone: '137****3003', status: 'enabled', createdAt: '2025-03-10' },
  { id: 'u4', username: 'zhaoshan', nickname: '赵山泉', role: 'merchant', phone: '136****4004', status: 'disabled', createdAt: '2025-04-05' },
  { id: 'u5', username: 'chenming', nickname: '陈明', role: 'user', phone: '135****5005', status: 'enabled', createdAt: '2025-05-12' },
  { id: 'u6', username: 'yanghua', nickname: '杨华', role: 'user', phone: '158****6006', status: 'enabled', createdAt: '2025-06-08' },
  { id: 'u7', username: 'huanglei', nickname: '黄磊', role: 'user', phone: '159****7007', status: 'disabled', createdAt: '2025-07-22' },
  { id: 'u8', username: 'zhouyun', nickname: '周云', role: 'merchant', phone: '186****8008', status: 'enabled', createdAt: '2025-08-18' },
]

export const mockAuditGoods: AuditGoods[] = [
  { id: 'ag1', name: '日照绿茶', price: 168, image: 'https://picsum.photos/seed/rizhao-lvcha/400/400', merchant: '王茶商', submittedAt: '2026-06-05', status: 'pending' },
  { id: 'ag2', name: '武夷肉桂', price: 388, image: 'https://picsum.photos/seed/wuyi-rougui/400/400', merchant: '赵山泉', submittedAt: '2026-06-04', status: 'pending' },
  { id: 'ag3', name: '安化黑茶', price: 218, image: 'https://picsum.photos/seed/anhua-heicha/400/400', merchant: '周云', submittedAt: '2026-06-03', status: 'pending' },
  { id: 'ag4', name: '六安瓜片', price: 298, image: 'https://picsum.photos/seed/liuan-guapian/400/400', merchant: '王茶商', submittedAt: '2026-06-02', status: 'pending' },
  { id: 'ag5', name: '凤凰单丛', price: 358, image: 'https://picsum.photos/seed/fenghuang-dancong/400/400', merchant: '赵山泉', submittedAt: '2026-06-01', status: 'pending' },
]

export const mockFeedbackList: FeedbackItem[] = [
  { id: 'fb1', username: 'chenming', type: '投诉', content: '茶叶包装破损，收到时外包装有明显挤压痕迹，希望平台加强物流包装', status: 'pending', createdAt: '2026-06-06' },
  { id: 'fb2', username: 'yanghua', type: '建议', content: '建议增加茶叶产地溯源功能，可以扫码查看采摘和制作过程', status: 'pending', createdAt: '2026-06-05' },
  { id: 'fb3', username: 'huanglei', type: '咨询', content: '请问平台支持线下门店自提吗？我在杭州想自己去取', status: 'processed', createdAt: '2026-06-04' },
  { id: 'fb4', username: 'zhangwei', type: 'BUG反馈', content: '使用微信支付时偶尔会出现支付成功但订单显示未支付的情况', status: 'processed', createdAt: '2026-06-03' },
  { id: 'fb5', username: 'liuyang', type: '建议', content: '希望增加试饮装功能，新用户可以先买小包装试试口感', status: 'ignored', createdAt: '2026-06-02' },
  { id: 'fb6', username: 'chenming', type: '投诉', content: '客服回复太慢了，等了两个小时才有人回复，体验很差', status: 'pending', createdAt: '2026-06-01' },
]
