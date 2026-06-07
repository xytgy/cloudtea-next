import type { TeaPost, Comment, Topic, UserProfile } from '@/types/tea-circle'

export const mockPosts: TeaPost[] = [
  {
    id: '1',
    author: {
      id: 'u1',
      nickname: '山间茶客',
      avatar: 'https://picsum.photos/seed/tea-user1/100/100',
      level: 5,
    },
    content:
      '今天去了武夷山桐木关，亲手采了一篮子正山小种的鲜叶。山场的生态环境真的太好了，溪水潺潺、云雾缭绕。老师傅说今年的春茶品质比去年更好，期待成品出来！',
    images: [
      'https://picsum.photos/seed/wuyi-mountain/600/400',
      'https://picsum.photos/seed/tea-picking/600/400',
      'https://picsum.photos/seed/master-cha/600/400',
    ],
    topics: ['武夷岩茶', '春茶季'],
    likeCount: 128,
    commentCount: 23,
    isLiked: false,
    isFollowing: true,
    createdAt: '2026-06-07T10:30:00',
  },
  {
    id: '2',
    author: {
      id: 'u2',
      nickname: '静心茶舍',
      avatar: 'https://picsum.photos/seed/tea-user2/100/100',
      level: 3,
    },
    content:
      '新入手了一把宜兴紫砂壶，底槽清泥料，手工制作。壶型是经典的仿古壶，拿在手里温润如玉。迫不及待地泡了一壶老白茶试试，出汤非常顺畅，壶的吸附性让茶汤更加柔和了。',
    images: [
      'https://picsum.photos/seed/zisha-pot/600/600',
    ],
    topics: ['茶道入门'],
    likeCount: 89,
    commentCount: 15,
    isLiked: true,
    isFollowing: false,
    createdAt: '2026-06-06T18:45:00',
  },
  {
    id: '3',
    author: {
      id: 'u3',
      nickname: '普洱老饕',
      avatar: 'https://picsum.photos/seed/tea-user3/100/100',
      level: 8,
    },
    content:
      '翻出了2010年的老班章熟茶，仓储干净，打开包装就能闻到陈香。汤色红浓透亮如琥珀，入口醇厚顺滑，几乎没有堆味了，枣香和木香交织，回甘绵长。十年转化真的让这款茶脱胎换骨，好茶值得等待。',
    images: [
      'https://picsum.photos/seed/puer-old/600/400',
      'https://picsum.photos/seed/puer-soup/600/400',
      'https://picsum.photos/seed/puer-cake/600/400',
      'https://picsum.photos/seed/puer-leaves/600/400',
    ],
    topics: ['普洱收藏'],
    likeCount: 256,
    commentCount: 42,
    isLiked: false,
    isFollowing: true,
    createdAt: '2026-06-06T14:20:00',
  },
  {
    id: '4',
    author: {
      id: 'u4',
      nickname: '白茶小姐',
      avatar: 'https://picsum.photos/seed/tea-user4/100/100',
      level: 4,
    },
    content:
      '分享一个泡白毫银针的小技巧：用90度水温，盖碗快出汤，前三泡5秒出汤，之后每泡增加3-5秒。这样泡出来的银针毫香显露，汤感鲜爽甘甜，不会有闷出来的苦涩感。试试看吧～',
    images: [],
    topics: ['白茶品鉴', '茶道入门'],
    likeCount: 183,
    commentCount: 31,
    isLiked: false,
    isFollowing: false,
    createdAt: '2026-06-05T20:15:00',
  },
  {
    id: '5',
    author: {
      id: 'u5',
      nickname: '岩骨花香',
      avatar: 'https://picsum.photos/seed/tea-user5/100/100',
      level: 6,
    },
    content:
      '今天参加了一场武夷岩茶品鉴会，对比了三款不同山场的肉桂：慧苑坑的花香肉桂、马头岩的霸气肉桂、牛栏坑的奶油肉桂。同一品种不同山场，风味差异之大令人惊叹，这就是岩茶"一岩一味"的魅力。',
    images: [
      'https://picsum.photos/seed/yancha-tasting/600/400',
      'https://picsum.photos/seed/yancha-cups/600/400',
    ],
    topics: ['武夷岩茶'],
    likeCount: 312,
    commentCount: 57,
    isLiked: true,
    isFollowing: true,
    createdAt: '2026-06-05T16:30:00',
  },
  {
    id: '6',
    author: {
      id: 'u6',
      nickname: '茶室一角',
      avatar: 'https://picsum.photos/seed/tea-user6/100/100',
      level: 2,
    },
    content:
      '周末的午后，阳光透过竹帘洒在茶席上。泡了一壶凤凰单丛的鸭屎香，花香满室。配上一块手工绿豆糕，这就是最好的周末时光了。生活需要仪式感，而茶就是最好的仪式。',
    images: [
      'https://picsum.photos/seed/tea-corner/600/600',
      'https://picsum.photos/seed/tea-sunlight/600/400',
      'https://picsum.photos/seed/tea-snack/600/400',
      'https://picsum.photos/seed/tea-cup-art/600/400',
      'https://picsum.photos/seed/tea-bamboo/600/400',
    ],
    topics: ['春茶季', '茶道入门'],
    likeCount: 421,
    commentCount: 68,
    isLiked: false,
    isFollowing: false,
    createdAt: '2026-06-04T11:00:00',
  },
]

export const mockTopics: Topic[] = [
  {
    id: 't1',
    name: '春茶季',
    title: '春茶季',
    description: '分享春茶采摘、制作、品饮的一切，记录春天的第一杯鲜爽',
    postCount: 1256,
    viewCount: 35800,
    isHot: true,
  },
  {
    id: 't2',
    name: '茶道入门',
    title: '茶道入门',
    description: '新手友好！从选茶、泡茶到品茶，带你走进茶的世界',
    postCount: 892,
    viewCount: 28400,
    isHot: true,
  },
  {
    id: 't3',
    name: '普洱收藏',
    title: '普洱收藏',
    description: '普洱茶收藏、存储、转化经验交流，品鉴不同年份的普洱',
    postCount: 634,
    viewCount: 19200,
    isHot: false,
  },
  {
    id: 't4',
    name: '武夷岩茶',
    title: '武夷岩茶',
    description: '大红袍、肉桂、水仙……探讨武夷岩茶的岩骨花香',
    postCount: 1089,
    viewCount: 31500,
    isHot: true,
  },
  {
    id: 't5',
    name: '白茶品鉴',
    title: '白茶品鉴',
    description: '银针、牡丹、寿眉，一年茶三年药七年宝，品味白茶之美',
    postCount: 478,
    viewCount: 14600,
    isHot: false,
  },
]

export const mockPostDetail: TeaPost = {
  id: '1',
  author: {
    id: 'u1',
    nickname: '山间茶客',
    avatar: 'https://picsum.photos/seed/tea-user1/100/100',
    level: 5,
  },
  content:
    '今天去了武夷山桐木关，亲手采了一篮子正山小种的鲜叶。山场的生态环境真的太好了，溪水潺潺、云雾缭绕。老师傅说今年的春茶品质比去年更好，期待成品出来！\n\n这次主要看的是菜茶群体种，芽头肥壮，叶质柔软，持嫩性很好。做青的时候花香就已经非常明显了，感觉今年的松烟香也会更加纯正。',
  images: [
    'https://picsum.photos/seed/wuyi-mountain/600/400',
    'https://picsum.photos/seed/tea-picking/600/400',
    'https://picsum.photos/seed/master-cha/600/400',
  ],
  topics: ['武夷岩茶', '春茶季'],
  likeCount: 128,
  commentCount: 23,
  isLiked: false,
  isFollowing: true,
  createdAt: '2026-06-07T10:30:00',
}

export const mockComments: Comment[] = [
  {
    id: 'c1',
    author: { id: 'u3', nickname: '普洱老饕', avatar: 'https://picsum.photos/seed/tea-user3/100/100' },
    content: '桐木关的正山小种绝对是红茶天花板，羡慕能去产地的朋友！',
    createdAt: '2026-06-07T11:00:00',
    children: [
      {
        id: 'c1-1',
        author: { id: 'u1', nickname: '山间茶客', avatar: 'https://picsum.photos/seed/tea-user1/100/100' },
        content: '哈哈欢迎一起来！山场真的很美，值得专门去一趟',
        createdAt: '2026-06-07T11:15:00',
        replyTo: { id: 'u3', nickname: '普洱老饕' },
      },
    ],
  },
  {
    id: 'c2',
    author: { id: 'u5', nickname: '岩骨花香', avatar: 'https://picsum.photos/seed/tea-user5/100/100' },
    content: '今年桐木关的雨水适量，茶叶品质确实比往年好。菜茶群体种做出来的小种香气层次更丰富',
    createdAt: '2026-06-07T12:30:00',
    children: [],
  },
  {
    id: 'c3',
    author: { id: 'u4', nickname: '白茶小姐', avatar: 'https://picsum.photos/seed/tea-user4/100/100' },
    content: '请问正山小种和金骏眉的制作工艺有什么区别呀？',
    createdAt: '2026-06-07T14:00:00',
    children: [
      {
        id: 'c3-1',
        author: { id: 'u1', nickname: '山间茶客', avatar: 'https://picsum.photos/seed/tea-user1/100/100' },
        content: '主要区别在原料：正山小种用一芽三四叶，金骏眉只取单芽。工艺上金骏眉不烟熏，正山小种传统工艺有松烟熏制这一步。两者各有特色～',
        createdAt: '2026-06-07T14:20:00',
        replyTo: { id: 'u4', nickname: '白茶小姐' },
      },
    ],
  },
  {
    id: 'c4',
    author: { id: 'u6', nickname: '茶室一角', avatar: 'https://picsum.photos/seed/tea-user6/100/100' },
    content: '照片拍得太美了！云雾中的茶山像仙境一样',
    createdAt: '2026-06-07T15:30:00',
    children: [],
  },
]

export const mockUserProfile: UserProfile = {
  id: 'u1',
  nickname: '山间茶客',
  avatar: 'https://picsum.photos/seed/tea-user1/100/100',
  signature: '行走于茶山之间，记录每一杯好茶的故事',
  followerCount: 2340,
  followingCount: 186,
  likeCount: 12800,
  postCount: 96,
  isFollowing: false,
}

export const mockFollowingUsers: { id: string; nickname: string; avatar: string; isOnline: boolean }[] = [
  { id: 'u1', nickname: '山间茶客', avatar: 'https://picsum.photos/seed/tea-user1/100/100', isOnline: true },
  { id: 'u3', nickname: '普洱老饕', avatar: 'https://picsum.photos/seed/tea-user3/100/100', isOnline: true },
  { id: 'u5', nickname: '岩骨花香', avatar: 'https://picsum.photos/seed/tea-user5/100/100', isOnline: false },
  { id: 'u2', nickname: '静心茶舍', avatar: 'https://picsum.photos/seed/tea-user2/100/100', isOnline: true },
  { id: 'u7', nickname: '茶香满屋', avatar: 'https://picsum.photos/seed/tea-user7/100/100', isOnline: false },
  { id: 'u8', nickname: '品茗居士', avatar: 'https://picsum.photos/seed/tea-user8/100/100', isOnline: true },
  { id: 'u9', nickname: '一盏清茗', avatar: 'https://picsum.photos/seed/tea-user9/100/100', isOnline: false },
  { id: 'u10', nickname: '茶话人生', avatar: 'https://picsum.photos/seed/tea-user10/100/100', isOnline: false },
]

export const mockNotifications: {
  id: string
  type: 'like' | 'comment' | 'follow'
  user: { id: string; nickname: string; avatar: string }
  content: string
  createdAt: string
  isRead: boolean
}[] = [
  {
    id: 'n1',
    type: 'like',
    user: { id: 'u3', nickname: '普洱老饕', avatar: 'https://picsum.photos/seed/tea-user3/100/100' },
    content: '赞了你的动态',
    createdAt: '2026-06-07T16:00:00',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'comment',
    user: { id: 'u5', nickname: '岩骨花香', avatar: 'https://picsum.photos/seed/tea-user5/100/100' },
    content: '评论了你的动态："今年桐木关的雨水适量……"',
    createdAt: '2026-06-07T12:30:00',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'follow',
    user: { id: 'u7', nickname: '茶香满屋', avatar: 'https://picsum.photos/seed/tea-user7/100/100' },
    content: '关注了你',
    createdAt: '2026-06-07T09:00:00',
    isRead: true,
  },
  {
    id: 'n4',
    type: 'like',
    user: { id: 'u6', nickname: '茶室一角', avatar: 'https://picsum.photos/seed/tea-user6/100/100' },
    content: '赞了你的评论',
    createdAt: '2026-06-06T22:00:00',
    isRead: true,
  },
  {
    id: 'n5',
    type: 'comment',
    user: { id: 'u2', nickname: '静心茶舍', avatar: 'https://picsum.photos/seed/tea-user2/100/100' },
    content: '回复了你的评论："谢谢分享，受益匪浅！"',
    createdAt: '2026-06-06T18:00:00',
    isRead: true,
  },
]
