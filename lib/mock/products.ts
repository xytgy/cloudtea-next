import type { Product, ProductDetail, ProductReview } from '@/types/product'

export const mockProducts: Product[] = [
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
    id: '2',
    name: '碧螺春',
    price: 328,
    originalPrice: 428,
    image: 'https://picsum.photos/seed/biluochun/400/400',
    sales: 1876,
    category: '绿茶',
    description: '太湖洞庭山原产，卷曲如螺花果香浓郁，一芽一叶手工采摘',
  },
  {
    id: '3',
    name: '安溪铁观音',
    price: 258,
    originalPrice: 358,
    image: 'https://picsum.photos/seed/tieguanyin/400/400',
    sales: 3102,
    category: '乌龙',
    description: '正秋铁观音，传统工艺炭焙，兰花香韵持久回甘生津',
  },
  {
    id: '4',
    name: '武夷岩茶',
    price: 468,
    originalPrice: 568,
    image: 'https://picsum.photos/seed/wuyi-yancha/400/400',
    sales: 1543,
    category: '乌龙',
    description: '武夷山核心产区大红袍，岩骨花香三坑两涧正岩茶',
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
    id: '6',
    name: '祁门红茶',
    price: 288,
    originalPrice: 388,
    image: 'https://picsum.photos/seed/qimen-hongcha/400/400',
    sales: 2876,
    category: '红茶',
    description: '祁门核心产区工夫红茶，似花似蜜似果世界三大高香红茶',
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
  {
    id: '8',
    name: '白牡丹',
    price: 188,
    originalPrice: 258,
    image: 'https://picsum.photos/seed/baimudan/400/400',
    sales: 1654,
    category: '白茶',
    description: '福鼎高山白牡丹，一芽二叶花香清雅三年陈韵渐显',
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
    id: '10',
    name: '易武古树',
    price: 568,
    originalPrice: 728,
    image: 'https://picsum.photos/seed/yiwu-gushu/400/400',
    sales: 1230,
    category: '普洱',
    description: '易武麻黑古树春茶，蜜韵柔甜细腻绵长七村八寨经典风味',
  },
  {
    id: '11',
    name: '安吉白茶',
    price: 358,
    originalPrice: 458,
    image: 'https://picsum.photos/seed/anjibaicha/400/400',
    sales: 2100,
    category: '绿茶',
    description: '浙江安吉竹乡白叶一号，氨基酸含量极高鲜爽甘甜叶白脉翠',
  },
  {
    id: '12',
    name: '金骏眉',
    price: 438,
    originalPrice: 588,
    image: 'https://picsum.photos/seed/jinjunmei/400/400',
    sales: 3560,
    category: '红茶',
    description: '武夷山桐木关全芽头金骏眉，蜜薯香馥郁汤色金黄透亮',
  },
]

export const mockProductDetails: Record<string, ProductDetail> = {
  '1': {
    ...mockProducts[0],
    images: [
      'https://picsum.photos/seed/xihu-longjing-1/400/400',
      'https://picsum.photos/seed/xihu-longjing-2/400/400',
      'https://picsum.photos/seed/xihu-longjing-3/400/400',
    ],
    stock: 200,
    specs: [
      { name: '规格', values: ['50g', '100g', '250g'] },
      { name: '等级', values: ['特级', '一级'] },
    ],
    detail: `西湖龙井，中国十大名茶之首，产于浙江省杭州市西湖龙井村周围群山。
核心产区包括狮峰、龙井、云栖、虎跑、梅家坞五大产区。
本品为明前特级龙井，采摘于清明节前，选用一芽一叶初展鲜叶。
经传统手工炒制，扁平光滑挺直削尖，色泽嫩绿鲜润。
冲泡后汤色碧绿明亮，香气清高持久，带有独特的豆花香。
滋味鲜爽甘醇，叶底嫩匀成朵，一枪一旗栩栩如生。
龙井茶富含茶多酚、氨基酸、维生素等营养成分，常饮有益健康。`,
  },
  '2': {
    ...mockProducts[1],
    images: [
      'https://picsum.photos/seed/biluochun-1/400/400',
      'https://picsum.photos/seed/biluochun-2/400/400',
      'https://picsum.photos/seed/biluochun-3/400/400',
    ],
    stock: 150,
    specs: [
      { name: '规格', values: ['50g', '125g', '250g'] },
      { name: '等级', values: ['特级一等', '特级二等'] },
    ],
    detail: `碧螺春，中国传统名茶，产于江苏省苏州市太湖洞庭山。
因其条索纤细卷曲如螺，色泽银绿隐翠，又在春天采制，故名碧螺春。
本品选用明前头采嫩芽，一芽一叶精心拣剔。
采用高温杀青、热揉成形、搓团显毫、干燥四道工序制成。
干茶条索紧结卷曲，白毫显露，色泽银绿，冲泡后汤色碧绿清澈。
香气浓郁芬芳，有天然的花果香，口感鲜爽回甘，余韵悠长。
碧螺春在清代就被列为贡茶，是中国最具代表性的绿茶之一。`,
  },
  '3': {
    ...mockProducts[2],
    images: [
      'https://picsum.photos/seed/tieguanyin-1/400/400',
      'https://picsum.photos/seed/tieguanyin-2/400/400',
      'https://picsum.photos/seed/tieguanyin-3/400/400',
    ],
    stock: 300,
    specs: [
      { name: '规格', values: ['100g', '250g', '500g'] },
      { name: '香型', values: ['清香型', '浓香型', '陈香型'] },
    ],
    detail: `安溪铁观音，中国十大名茶之一，原产于福建省泉州市安溪县。
铁观音属于乌龙茶类，介于绿茶和红茶之间，是半发酵茶的代表。
本品为正秋铁观音，采用传统摇青工艺制作，达到"绿叶红镶边"的理想状态。
干茶颗粒紧结沉重，色泽砂绿翠润，冲泡后兰花香气馥郁高扬。
汤色金黄明亮，滋味醇厚甘鲜，具有独特的"观音韵"和"兰花香"。
七泡有余香，回甘持久，齿颊留香。铁观音含有丰富的茶多酚和氨基酸，
常饮可提神益思、消食去腻、美容养颜。`,
  },
  '4': {
    ...mockProducts[3],
    images: [
      'https://picsum.photos/seed/wuyi-yancha-1/400/400',
      'https://picsum.photos/seed/wuyi-yancha-2/400/400',
      'https://picsum.photos/seed/wuyi-yancha-3/400/400',
    ],
    stock: 80,
    specs: [
      { name: '规格', values: ['50g', '100g', '250g'] },
      { name: '品种', values: ['大红袍', '肉桂', '水仙'] },
    ],
    detail: `武夷岩茶，产于福建武夷山风景区，以其独特的"岩骨花香"闻名于世。
武夷山丹霞地貌，三十六峰九十九岩，岩岩有茶，非岩不茶。
本品为大红袍核心产区正岩茶，采自三坑两涧中的慧苑坑。
经萎凋、做青、炒青、揉捻、烘焙等传统工序精心制作。
条索匀整壮实，色泽乌润，香气馥郁深沉带有岩韵。
汤色橙红透亮，滋味醇厚岩韵明显，回甘悠长岩骨花香。
武夷岩茶是中国乌龙茶中品质最高的代表，素有"茶中之王"的美誉。`,
  },
  '5': {
    ...mockProducts[4],
    images: [
      'https://picsum.photos/seed/zhengshan-1/400/400',
      'https://picsum.photos/seed/zhengshan-2/400/400',
      'https://picsum.photos/seed/zhengshan-3/400/400',
    ],
    stock: 500,
    specs: [
      { name: '规格', values: ['100g', '250g', '500g'] },
      { name: '工艺', values: ['传统烟熏', '无烟'] },
    ],
    detail: `正山小种，世界红茶的鼻祖，产于福建省武夷山市桐木关。
距今已有四百余年历史，最早由茶农在无意中发明。
本品采用传统松针或松柴熏制工艺，干茶条索肥壮紧结，色泽乌润。
冲泡后汤色深红透亮，香气独特，带有浓郁的松烟香和桂圆干香。
滋味醇厚甘甜，有独特的蜜韵，叶底呈古铜色匀齐明亮。
正山小种茶性温和，适合四季饮用，冬天品饮更觉温暖舒畅。
冲泡建议：水温95℃，盖碗或紫砂壶均可，可冲泡8-10次。`,
  },
  '6': {
    ...mockProducts[5],
    images: [
      'https://picsum.photos/seed/qimen-hongcha-1/400/400',
      'https://picsum.photos/seed/qimen-hongcha-2/400/400',
      'https://picsum.photos/seed/qimen-hongcha-3/400/400',
    ],
    stock: 250,
    specs: [
      { name: '规格', values: ['100g', '250g', '500g'] },
      { name: '等级', values: ['特茗', '特级', '一级'] },
    ],
    detail: `祁门红茶，简称祁红，产于安徽省黄山市祁门县，与印度大吉岭红茶、
斯里兰卡乌瓦红茶并称世界三大高香红茶。
祁红制作工艺精细，需经萎凋、揉捻、发酵、干燥等十余道工序。
干茶条索紧细秀长，色泽乌润有金毫，冲泡后汤色红艳明亮。
香气独特，似花似蜜似果，国际茶市称之为"祁门香"。
滋味醇厚鲜甜，回味悠长，叶底红匀明亮。
祁红宜清饮最能领略其独特风味，也适合加入牛奶调饮。`,
  },
  '7': {
    ...mockProducts[6],
    images: [
      'https://picsum.photos/seed/baihao-yinzhen-1/400/400',
      'https://picsum.photos/seed/baihao-yinzhen-2/400/400',
      'https://picsum.photos/seed/baihao-yinzhen-3/400/400',
    ],
    stock: 60,
    specs: [
      { name: '规格', values: ['25g', '50g', '100g'] },
      { name: '年份', values: ['2024年新茶', '2022年陈茶'] },
    ],
    detail: `白毫银针，白茶中的极品，素有茶中"美女"之称。
产于福建省福鼎市和政和县，以福鼎太姥山所产最为著名。
本品选用福鼎大白茶或大毫茶的头采单芽，芽头肥壮饱满。
满披白毫，色白似银，形状如针，故名白毫银针。
不炒不揉，自然萎凋，最大程度保留了茶叶的天然营养。
冲泡后汤色杏黄清透，毫香清鲜，入口甘醇清爽。
白茶具有"一年茶、三年药、七年宝"的特性，越陈越有价值。`,
  },
  '8': {
    ...mockProducts[7],
    images: [
      'https://picsum.photos/seed/baimudan-1/400/400',
      'https://picsum.photos/seed/baimudan-2/400/400',
      'https://picsum.photos/seed/baimudan-3/400/400',
    ],
    stock: 180,
    specs: [
      { name: '规格', values: ['100g', '250g', '500g'] },
      { name: '年份', values: ['2024年新茶', '2021年陈茶'] },
    ],
    detail: `白牡丹，白茶中的上乘佳品，因其绿叶夹银白色芽心形似花朵而得名。
产于福建省福鼎市和政和县，选用一芽二叶为原料。
干茶色泽灰绿，叶背白毫银亮，绿面白底，冲泡后毫香清幽。
汤色杏黄或橙黄，滋味醇和鲜爽，有独特的花香和毫香。
叶底黄绿柔软，叶脉微红，有"红装素裹"之美誉。
白牡丹性价比较高，既可品饮也可收藏，是入门白茶的首选。`,
  },
  '9': {
    ...mockProducts[8],
    images: [
      'https://picsum.photos/seed/laobanzhang-1/400/400',
      'https://picsum.photos/seed/laobanzhang-2/400/400',
      'https://picsum.photos/seed/laobanzhang-3/400/400',
    ],
    stock: 30,
    specs: [
      { name: '规格', values: ['357g饼', '100g沱', '50g砖'] },
      { name: '年份', values: ['2023年', '2020年', '2015年'] },
    ],
    detail: `老班章，普洱茶中的王者，产于云南省西双版纳州勐海县布朗山老班章村。
海拔1700-1900米，常年云雾缭绕，生态环境优越。
本品选用老班章古茶园古树纯料，树龄三百年以上。
干茶条索粗壮肥硕，芽头饱满白毫显著，色泽墨绿油润。
冲泡后汤色金黄透亮，茶气刚猛霸道，苦底重但化得极快。
回甘强烈持久，生津迅猛，喉韵深广，有独特的兰花香和蜜香。
叶底肥厚柔软有弹性，芽叶完整。老班章普洱茶极具存放价值。`,
  },
  '10': {
    ...mockProducts[9],
    images: [
      'https://picsum.photos/seed/yiwu-gushu-1/400/400',
      'https://picsum.photos/seed/yiwu-gushu-2/400/400',
      'https://picsum.photos/seed/yiwu-gushu-3/400/400',
    ],
    stock: 120,
    specs: [
      { name: '规格', values: ['357g饼', '100g沱', '200g砖'] },
      { name: '年份', values: ['2023年', '2019年', '2012年'] },
    ],
    detail: `易武古树普洱茶，产于云南省西双版纳州勐腊县易武古镇。
易武是古六大茶山之首，清朝时期是贡茶的重要产地。
本品选用易武麻黑寨古树春茶，树龄两百年以上。
干茶条索肥壮修长，色泽黑亮油润，芽头显毫。
冲泡后汤色明黄透亮，蜜香浓郁，入口柔甜细腻。
水路细滑如丝，几乎没有苦涩感，回甘绵长持久。
素有"班章为王，易武为后"之美誉，以柔美见长，适合长期存放。`,
  },
  '11': {
    ...mockProducts[10],
    images: [
      'https://picsum.photos/seed/anjibaicha-1/400/400',
      'https://picsum.photos/seed/anjibaicha-2/400/400',
      'https://picsum.photos/seed/anjibaicha-3/400/400',
    ],
    stock: 160,
    specs: [
      { name: '规格', values: ['50g', '100g', '250g'] },
      { name: '等级', values: ['精品', '特级'] },
    ],
    detail: `安吉白茶，产于浙江省湖州市安吉县，虽名"白茶"实为绿茶。
因其茶树品种为白叶一号，春季新芽叶色嫩白故称白茶。
安吉素有"中国竹乡"之美誉，竹林覆盖率高达70%，生态环境极佳。
干茶条索挺直芽头肥壮，色泽翠绿间嫩黄，白毫显露。
冲泡后汤色杏黄清透，香气清鲜高扬带有嫩竹叶香。
滋味鲜爽甘醇，氨基酸含量高达5%-10.6%，是普通绿茶的2-3倍。
叶底叶白脉翠完整匀齐，形如玉筷。安吉白茶口感极为鲜爽，适合清饮。`,
  },
  '12': {
    ...mockProducts[11],
    images: [
      'https://picsum.photos/seed/jinjunmei-1/400/400',
      'https://picsum.photos/seed/jinjunmei-2/400/400',
      'https://picsum.photos/seed/jinjunmei-3/400/400',
    ],
    stock: 100,
    specs: [
      { name: '规格', values: ['50g', '100g', '250g'] },
      { name: '等级', values: ['特级', '一级'] },
    ],
    detail: `金骏眉，红茶中的顶级品种，创制于2005年，产于武夷山桐木关。
全部选用高山茶芽尖为原料，约6-8万颗芽尖制成一斤成品。
干茶条索紧细如眉，色泽金黄黑相间，金毫显露。
冲泡后汤色金黄透亮如琥珀，香气馥郁多变，蜜薯香花香交织。
滋味甘甜醇厚，口感绵柔细腻，余韵悠长带有高山韵。
叶底芽头鲜活匀整，呈古铜色明亮有光泽。
金骏眉是中国高端红茶的代表，送礼自饮皆为上品。`,
  },
}

export const mockProductReviews: Record<string, ProductReview[]> = {
  '1': [
    { id: 'r1', userId: '101', username: '品茶客', avatar: 'https://picsum.photos/seed/user1/100/100', rating: 5, content: '明前龙井果然名不虚传，香气清幽入口鲜爽，和在杭州喝到的一样正宗！', images: [], createdAt: '2026-05-20' },
    { id: 'r2', userId: '102', username: '茶香四溢', avatar: 'https://picsum.photos/seed/user2/100/100', rating: 5, content: '包装精美茶叶品质很好，豆花香明显，汤色碧绿透亮，值得回购。', images: [], createdAt: '2026-05-18' },
    { id: 'r3', userId: '103', username: '西湖边的猫', avatar: 'https://picsum.photos/seed/user3/100/100', rating: 4, content: '整体不错，就是价格稍贵了点，不过品质确实好，送人很有面子。', images: [], createdAt: '2026-05-15' },
    { id: 'r4', userId: '104', username: '老茶友', avatar: 'https://picsum.photos/seed/user4/100/100', rating: 5, content: '喝了几十年龙井了，这家品质确实不错，明前特级够档次。', images: [], createdAt: '2026-05-12' },
    { id: 'r5', userId: '105', username: '茶小白', avatar: 'https://picsum.photos/seed/user5/100/100', rating: 4, content: '第一次买这么好的龙井，味道确实和超市的不一样，鲜爽很多！', images: [], createdAt: '2026-05-10' },
    { id: 'r6', userId: '106', username: '龙井控', avatar: 'https://picsum.photos/seed/user6/100/100', rating: 5, content: '每年都要买好几次，回购无数回了，品质一如既往地稳定。', images: [], createdAt: '2026-05-08' },
    { id: 'r7', userId: '107', username: '安静的饮者', avatar: 'https://picsum.photos/seed/user7/100/100', rating: 5, content: '芽头很漂亮，冲泡后一芽一叶很清晰，味道清甜回甘好。', images: [], createdAt: '2026-05-05' },
  ],
  '3': [
    { id: 'r8', userId: '108', username: '闽南茶客', avatar: 'https://picsum.photos/seed/user8/100/100', rating: 5, content: '正宗安溪铁观音，兰花香太正了！七泡有余香不是吹的。', images: [], createdAt: '2026-05-19' },
    { id: 'r9', userId: '109', username: '乌龙爱好者', avatar: 'https://picsum.photos/seed/user9/100/100', rating: 5, content: '观音韵明显，回甘很快，比之前买的其他品牌好太多。', images: [], createdAt: '2026-05-16' },
    { id: 'r10', userId: '110', username: '半发酵', avatar: 'https://picsum.photos/seed/user10/100/100', rating: 4, content: '清香型很好喝，口感清爽，适合夏天。就是希望包装能更好看些。', images: [], createdAt: '2026-05-13' },
    { id: 'r11', userId: '111', username: '茶道学习者', avatar: 'https://picsum.photos/seed/user11/100/100', rating: 5, content: '朋友推荐买的，果然没让我失望，已经推荐给其他朋友了。', images: [], createdAt: '2026-05-11' },
    { id: 'r12', userId: '112', username: '每日一杯', avatar: 'https://picsum.photos/seed/user12/100/100', rating: 4, content: '性价比很高的一款铁观音，日常口粮茶的不二之选。', images: [], createdAt: '2026-05-09' },
    { id: 'r13', userId: '113', username: '岩茶小白', avatar: 'https://picsum.photos/seed/user13/100/100', rating: 5, content: '第一次尝试这家的铁观音，很惊艳，香气和口感都是上乘。', images: [], createdAt: '2026-05-06' },
  ],
  '9': [
    { id: 'r14', userId: '114', username: '普洱老饕', avatar: 'https://picsum.photos/seed/user14/100/100', rating: 5, content: '老班章就是霸气！茶气十足，苦化得快回甘猛烈，喉韵深。', images: [], createdAt: '2026-05-17' },
    { id: 'r15', userId: '115', username: '存茶人', avatar: 'https://picsum.photos/seed/user15/100/100', rating: 5, content: '买了2023年的饼打算存几年再喝，相信会越存越香。', images: [], createdAt: '2026-05-14' },
    { id: 'r16', userId: '116', username: '班章铁粉', avatar: 'https://picsum.photos/seed/user16/100/100', rating: 5, content: '品质确实好，和我之前去勐海茶山买的一样正宗，值得信赖。', images: [], createdAt: '2026-05-11' },
    { id: 'r17', userId: '117', username: '新茶友', avatar: 'https://picsum.photos/seed/user17/100/100', rating: 4, content: '刚开始喝普洱，老班章的霸气有点hold不住，但确实是好茶。', images: [], createdAt: '2026-05-08' },
    { id: 'r18', userId: '118', username: '山头茶迷', avatar: 'https://picsum.photos/seed/user18/100/100', rating: 5, content: '古树料子很纯正，汤色金黄通透，兰花香蜜香兼具，难得的好茶。', images: [], createdAt: '2026-05-04' },
  ],
}

const defaultReviews: ProductReview[] = [
  { id: 'dr1', userId: '201', username: '爱喝茶', avatar: 'https://picsum.photos/seed/default1/100/100', rating: 5, content: '茶叶品质很好，包装也不错，物流很快。', images: [], createdAt: '2026-05-20' },
  { id: 'dr2', userId: '202', username: '茶友小王', avatar: 'https://picsum.photos/seed/default2/100/100', rating: 4, content: '味道不错，和描述的差不多，会回购的。', images: [], createdAt: '2026-05-18' },
  { id: 'dr3', userId: '203', username: '品茗居士', avatar: 'https://picsum.photos/seed/default3/100/100', rating: 5, content: '好茶！送人自饮两相宜，下次还来。', images: [], createdAt: '2026-05-15' },
  { id: 'dr4', userId: '204', username: '一杯清茶', avatar: 'https://picsum.photos/seed/default4/100/100', rating: 5, content: '第三次购买了，品质一如既往的好。', images: [], createdAt: '2026-05-12' },
  { id: 'dr5', userId: '205', username: '周末茶会', avatar: 'https://picsum.photos/seed/default5/100/100', rating: 4, content: '性价比很高，适合办公室日常饮用。', images: [], createdAt: '2026-05-10' },
  { id: 'dr6', userId: '206', username: '茶文化爱好者', avatar: 'https://picsum.photos/seed/default6/100/100', rating: 5, content: '冲泡后香气很好，汤色透亮，口感醇厚。', images: [], createdAt: '2026-05-07' },
  { id: 'dr7', userId: '207', username: '小张爱喝茶', avatar: 'https://picsum.photos/seed/default7/100/100', rating: 5, content: '朋友推荐的，果然没让我失望！', images: [], createdAt: '2026-05-03' },
  { id: 'dr8', userId: '208', username: '闲庭信步', avatar: 'https://picsum.photos/seed/default8/100/100', rating: 4, content: '整体不错，就是发货可以再快一点。', images: [], createdAt: '2026-05-01' },
]

export function getMockProductReviews(productId: string): ProductReview[] {
  return mockProductReviews[productId] || defaultReviews
}
