import type { Address } from '@/types/address'

export const mockAddresses: Address[] = [
  {
    id: 'a1',
    name: '张三',
    phone: '13888888888',
    province: '浙江省',
    city: '杭州市',
    district: '西湖区',
    detail: '龙井路1号茶香苑3栋2单元501',
    isDefault: true,
  },
  {
    id: 'a2',
    name: '李四',
    phone: '13966666666',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '陆家嘴环路100号国际金融中心A座1208',
    isDefault: false,
  },
]
