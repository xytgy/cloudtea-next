# CloudTea Next.js 重构设计文档

> 日期：2026-06-06
> 范围：电商购物流程模块
> 状态：待审批

## 1. 项目概述

### 1.1 背景

CloudTea（云栖茗茶）现有前端基于 Vue 3 + Element Plus，功能完整但视觉设计偏"管理系统"风格。本次重构使用 React + Next.js 技术栈，在新目录 `d:\software\cloudtea-next` 中从零搭建，目标是学习现代前端技术栈的同时，打造视觉质感更高的电商前端。

### 1.2 重构范围

**本期范围**：电商购物流程 6 个页面

| 序号 | 页面 | 路由 | 组件类型 |
|------|------|------|---------|
| 1 | 商品列表（首页） | `/` | Server Component |
| 2 | 商品详情 | `/products/[id]` | Server + Client 混合 |
| 3 | 购物车 | `/cart` | Client Component |
| 4 | 结算 | `/checkout` | Client Component |
| 5 | 收银台 | `/payment` | Client Component |
| 6 | 我的订单 | `/orders` | Server + Client 混合 |

**不含**：茶友圈社交、商家管理、管理员后台、用户中心（后续迭代）

### 1.3 技术栈

| 层面 | 选型 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 15.x |
| 语言 | TypeScript | 5.x |
| UI 组件库 | shadcn/ui + Radix UI | latest |
| 样式 | Tailwind CSS | 4.x |
| 动画 | Framer Motion | latest |
| 状态管理 | Zustand | latest |
| 数据请求 | TanStack Query | 5.x |
| HTTP 客户端 | 原生 fetch (Server) / axios (Client) | - |
| 表单 | React Hook Form + Zod | latest |
| 图标 | Lucide React | latest |
| 包管理器 | npm | - |

## 2. 设计系统

### 2.1 视觉风格

现代极简风，参考 Apple / Stripe / Linear 的设计语言。核心原则：
- 大量留白，呼吸感强
- 精致的排版层次
- 细腻的过渡动画
- 高级感的中性配色

### 2.2 配色方案

基于 shadcn/ui Stone 色板定制：

| 用途 | 色值 | Tailwind Token |
|------|------|---------------|
| 页面背景 | `#FAFAF9` | `stone-50` |
| 卡片背景 | `#FFFFFF` | `white` |
| 主文字 | `#1C1917` | `stone-900` |
| 次要文字 | `#78716C` | `stone-500` |
| 边框 | `#E7E5E4` | `stone-200` |
| 主按钮 | `#1C1917` | `stone-900` |
| 主按钮文字 | `#FAFAF9` | `stone-50` |
| 价格/成功 | `#16A34A` | `green-600` |
| 警告/缺货 | `#DC2626` | `red-600` |
| Hover 背景 | `#F5F5F4` | `stone-100` |

### 2.3 排版

- 字体：`Inter`（标题 + 正文），通过 `next/font/google` 加载
- 基础字号：`16px`（`text-base`）
- 行高：`1.6`（`leading-relaxed`）
- 标题层次：
  - H1：`text-3xl font-bold` (30px)
  - H2：`text-2xl font-semibold` (24px)
  - H3：`text-xl font-medium` (20px)
- 价格：`text-2xl font-bold` 或 `text-3xl font-bold`（商品详情页）

### 2.4 圆角与阴影

- 卡片：`rounded-xl` (12px)，`shadow-sm`，hover 时 `shadow-md`
- 按钮：`rounded-lg` (8px)
- 输入框：`rounded-lg` (8px)
- 图片：`rounded-lg` (8px)

### 2.5 动画规范

| 场景 | 动画 | 时长 |
|------|------|------|
| 页面切换 | 淡入淡出 (AnimatePresence) | 200ms |
| 卡片 hover | `translateY(-2px)` + 阴影加深 | 150ms ease |
| 加入购物车 | 按钮变 ✓ + 角标数字弹跳 | 300ms |
| 模态框打开 | 背景模糊 + 缩放淡入 | 200ms |
| 加载状态 | 骨架屏 pulse 动画 | 持续 |

## 3. 项目结构

```
cloudtea-next/
├── app/
│   ├── layout.tsx                    # 根布局：字体加载、Providers、全局样式
│   ├── page.tsx                      # 首页 → 重定向到 /products 或直接展示商品列表
│   ├── loading.tsx                   # 全局 loading UI
│   ├── error.tsx                     # 根级错误边界
│   ├── global-error.tsx              # 全局未捕获错误
│   ├── not-found.tsx                 # 404 页面
│   ├── (auth)/
│   │   └── login/
│   │       ├── page.tsx              # 登录页
│   │       ├── loading.tsx
│   │       └── error.tsx
│   ├── (shop)/
│   │   ├── layout.tsx                # 商城布局：Header + Footer
│   │   ├── error.tsx                 # 商城路由组错误边界
│   │   ├── products/
│   │   │   ├── page.tsx              # 商品列表（Server Component）
│   │   │   ├── loading.tsx           # 商品列表骨架屏
│   │   │   └── [id]/
│   │   │       ├── page.tsx          # 商品详情（Server Component）
│   │   │       └── loading.tsx
│   │   ├── cart/
│   │   │   ├── page.tsx              # 购物车（Client Component）
│   │   │   └── loading.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx              # 结算页（Client Component）
│   │   ├── payment/
│   │   │   └── page.tsx              # 收银台（Client Component）
│   │   └── orders/
│   │       ├── page.tsx              # 我的订单（Server + Client）
│   │       └── loading.tsx
│   └── api/
│       └── proxy/
│           └── [...path]/
│               └── route.ts          # 统一 API 代理
├── middleware.ts                      # 认证路由保护
├── components/
│   ├── ui/                           # shadcn/ui 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── tabs.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx                 # 移动端侧滑面板
│   │   ├── toast.tsx
│   │   └── dropdown-menu.tsx
│   ├── layout/
│   │   ├── header.tsx                # 顶部导航（sticky + backdrop-blur）
│   │   ├── footer.tsx                # 页脚
│   │   └── mobile-nav.tsx            # 移动端汉堡菜单
│   ├── product/
│   │   ├── product-card.tsx          # 商品卡片（Client：hover 动画）
│   │   ├── product-grid.tsx          # 响应式商品网格
│   │   ├── product-gallery.tsx       # 图片画廊（Client：切换交互）
│   │   ├── category-filter.tsx       # 分类 Tab 筛选（Client）
│   │   └── search-bar.tsx            # 搜索栏（Client）
│   ├── cart/
│   │   ├── cart-item.tsx             # 购物车单项
│   │   ├── cart-summary.tsx          # 结算汇总栏
│   │   └── add-to-cart-button.tsx    # 加入购物车按钮（Client：动画）
│   ├── order/
│   │   ├── order-card.tsx            # 订单卡片
│   │   ├── order-status-badge.tsx    # 状态标签
│   │   └── address-form.tsx          # 地址表单（Client：React Hook Form）
│   └── shared/
│       ├── image-with-fallback.tsx   # 图片 + 加载/错误兜底
│       ├── price-display.tsx         # 价格格式化展示
│       ├── empty-state.tsx           # 空状态占位
│       ├── providers.tsx             # 全局 Providers（QueryClient, Zustand hydration）
│       └── quantity-selector.tsx     # 数量选择器
├── lib/
│   ├── api/
│   │   ├── client.ts                 # axios 实例（客户端，token 拦截器）
│   │   ├── server.ts                 # fetch 封装（Server Components，从 cookies 读 token）
│   │   ├── products.ts               # 商品 API 函数
│   │   ├── cart.ts                   # 购物车 API 函数
│   │   ├── orders.ts                 # 订单 API 函数
│   │   ├── auth.ts                   # 认证 API 函数
│   │   └── addresses.ts              # 收货地址 API 函数
│   ├── store/
│   │   ├── auth-store.ts             # 认证状态（Zustand + persist to localStorage）
│   │   └── cart-store.ts             # 购物车状态（Zustand + persist to localStorage）
│   ├── hooks/
│   │   ├── use-auth.ts               # 认证相关 hooks
│   │   └── use-cart.ts               # 购物车相关 hooks
│   └── utils.ts                      # 工具函数（cn, formatPrice, formatDate 等）
├── types/
│   ├── product.ts                    # Product, Category 类型
│   ├── order.ts                      # Order, OrderStatus 类型
│   ├── cart.ts                       # CartItem 类型
│   ├── user.ts                       # User, UserInfo 类型
│   ├── address.ts                    # Address 类型
│   └── api.ts                        # API 通用响应类型（ApiResponse<T>, PaginatedData<T>）
├── public/
│   └── images/                       # 静态图片资源
├── styles/
│   └── globals.css                   # Tailwind 入口 + CSS 变量定义
├── .env.example                      # 环境变量模板
├── .env.local                        # 本地环境变量（gitignore）
├── env.d.ts                          # 环境变量 TypeScript 类型声明
├── components.json                   # shadcn/ui 配置
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

## 4. 架构设计

### 4.1 Server / Client 组件边界

**原则**：默认 Server Component，只有需要以下能力时才标记 `"use client"`：
- useState / useEffect / useReducer
- 事件监听（onClick, onChange 等）
- 浏览器 API（localStorage, window 等）
- 第三方客户端库（Framer Motion, TanStack Query 等）

| 组件 | 类型 | 原因 |
|------|------|------|
| `layout.tsx` (根) | Server | 只做布局组合 |
| `header.tsx` | Client | 购物车角标需要 Zustand 状态、滚动检测 |
| `product-card.tsx` | Client | hover 动画、加入购物车交互 |
| `product-grid.tsx` | Server | 纯数据展示，内部嵌套 Client 的 Card |
| `add-to-cart-button.tsx` | Client | onClick + 动画 + 状态更新 |
| `category-filter.tsx` | Client | Tab 切换交互（用 URL searchParams 实现可降级为 Server） |
| `cart/page.tsx` | Client | 全页交互（增删改查购物车） |
| `checkout/page.tsx` | Client | 表单交互 + 地址管理 |
| `orders/page.tsx` | 混合 | 外层 Server 拉数据，内层 Client 做操作按钮 |

### 4.2 数据流

```
┌─────────────────────────────────────────────────────────┐
│                    Server Component                      │
│                                                          │
│   import { getProducts } from "@/lib/api/products"       │
│   const products = await getProducts({ category })       │
│                                                          │
│   ┌───────────────────────────────────────┐              │
│   │         Client Component              │              │
│   │                                       │              │
│   │  <ProductCard product={product} />    │  ← props     │
│   │                                       │              │
│   │  <AddToCartButton productId={id} />   │              │
│   │    └── Zustand cart-store             │  ← 状态      │
│   │    └── axios → /api/proxy/cart/add    │  ← 请求      │
│   └───────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

**Server Components 数据获取**：
- 直接调用 `lib/api/server.ts` 中的函数
- 函数内部用 `fetch` 请求 API 代理
- 从 `cookies()` 读取认证 token
- 数据通过 props 传递给 Client 子组件

**Client Components 数据获取**：
- 用 TanStack Query 的 `useQuery` / `useMutation`
- 通过 `lib/api/client.ts`（axios）请求 API 代理
- axios 拦截器自动注入 token（从 Zustand auth-store 读取）

### 4.3 API 代理层

`app/api/proxy/[...path]/route.ts` 设计：

```
客户端请求 → /api/proxy/product/list → 代理到 → http://localhost:8080/api/product/list
```

安全策略：
- 环境变量 `PROXY_ALLOWED_PREFIXES` 定义白名单前缀
- 非白名单路径返回 403
- 请求方法透传（GET/POST/PUT/DELETE）
- 请求体透传（JSON / FormData）
- 自动注入 Authorization header

### 4.4 认证流程

```
1. 用户登录 → POST /api/proxy/auth/login
2. 返回 accessToken + refreshToken
3. 存入 Zustand auth-store（persist to localStorage）
4. 同时写入 httpOnly cookie（供 Server Components 读取）

后续请求：
- Client: axios 拦截器从 auth-store 读 token → 注入 header
- Server: 从 cookies() 读 token → 注入 fetch header

路由保护：
- middleware.ts 检查受保护路由的 cookie
- 无 token → 302 重定向到 /login?redirect=xxx
```

### 4.5 购物车状态管理

采用**本地优先 + 服务端同步**策略：

```
加入购物车：
1. 乐观更新 Zustand cart-store（立即反映到 UI）
2. 异步调用 POST /api/proxy/cart/add 同步到后端
3. 失败时回滚本地状态 + Toast 提示

页面加载：
1. 从 localStorage 恢复 Zustand cart-store（瞬时展示）
2. 后台调用 GET /api/proxy/cart/list 同步最新数据
3. 合并差异（以服务端为准）
```

## 5. 页面详细设计

### 5.1 商品列表页 `/`

**路由**：`app/(shop)/products/page.tsx`

**URL 参数**：
- `?category=绿茶` — 分类筛选
- `?keyword=龙井` — 搜索关键词
- `?page=1` — 分页

**布局**：
```
┌─────────────────────────────────────────┐
│  [Hero 品牌区]                            │
│  "云栖茗茶 · 源自山野的东方味道"            │
├─────────────────────────────────────────┤
│  [搜索栏]                     [搜索按钮]   │
├─────────────────────────────────────────┤
│  全部 | 绿茶 | 乌龙 | 红茶 | 白茶 | 普洱   │
├─────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ 图片  │ │ 图片  │ │ 图片  │ │ 图片  │   │
│  │ 名称  │ │ 名称  │ │ 名称  │ │ 名称  │   │
│  │ 价格  │ │ 价格  │ │ 价格  │ │ 价格  │   │
│  │ [加入] │ │ [加入] │ │ [已售罄]│ │ [加入] │   │
│  └──────┘ └──────┘ └──────┘ └──────┘   │
│  ┌──────┐ ┌──────┐ ...                  │
│  └──────┘ └──────┘                      │
├─────────────────────────────────────────┤
│  [分页器]  < 1 2 3 ... 10 >             │
└─────────────────────────────────────────┘
```

**响应式**：
- 移动端：2 列网格
- 平板：3 列
- 桌面：4 列

### 5.2 商品详情页 `/products/[id]`

**布局**：
```
┌─────────────────────────────────────────┐
│  首页 > 绿茶 > 龙井问茶                    │  ← 面包屑
├──────────────────┬──────────────────────┤
│                  │  龙井问茶 · 特级        │
│   [主图]          │  ¥268.00             │
│   ┌──┬──┬──┐    │  库存：128 件           │
│   │缩│略│图│    │                        │
│   └──┴──┴──┘    │  数量: [- 1 +]         │
│                  │                        │
│                  │  [加入购物车] [立即购买]   │
│                  │                        │
│                  │  🏪 进入店铺 | 💬 联系客服 │
├──────────────────┴──────────────────────┤
│  [商品详情] | [用户评价 (128)]             │
├─────────────────────────────────────────┤
│  Tab 内容区                              │
└─────────────────────────────────────────┘
```

### 5.3 购物车 `/cart`

**布局**：
```
┌─────────────────────────────────────────┐
│  购物车 (3)                              │
├─────────────────────────────────────────┤
│  ☑ 全选                                 │
├─────────────────────────────────────────┤
│  ☑ [图片] 龙井问茶  ¥268  [- 1 +] [删除] │
│  ☑ [图片] 武夷岩茶  ¥198  [- 2 +] [删除] │
│  ☐ [图片] 安溪铁观音 ¥158  [- 1 +] [删除] │
├─────────────────────────────────────────┤
│  已选 2 件  合计: ¥664.00                │
│                        [去结算 →]         │
└─────────────────────────────────────────┘
```

### 5.4 结算页 `/checkout`

**布局**：
```
┌─────────────────────────────────────────┐
│  确认订单                                │
├─────────────────────────────────────────┤
│  📍 收货地址                              │
│  ┌─────────────────────────────────────┐│
│  │ 张三 138****8888                     ││
│  │ 北京市朝阳区xxx路xxx号               ││
│  │                        [默认] [编辑] ││
│  └─────────────────────────────────────┘│
│  [+ 添加新地址]                          │
├─────────────────────────────────────────┤
│  商品清单                                │
│  [图片] 龙井问茶 x1          ¥268.00    │
│  [图片] 武夷岩茶 x2          ¥396.00    │
├─────────────────────────────────────────┤
│  备注: [________________]               │
├─────────────────────────────────────────┤
│  商品总额: ¥664.00                      │
│  运费: 免运费                            │
│  合计: ¥664.00                          │
│                  [提交订单 →]             │
└─────────────────────────────────────────┘
```

### 5.5 收银台 `/payment`

**布局**：
```
┌─────────────────────────────────────────┐
│  收银台                                  │
├─────────────────────────────────────────┤
│          订单金额                         │
│          ¥664.00                        │
│                                         │
│  选择支付方式:                            │
│  ┌──────────┐  ┌──────────┐            │
│  │ 💳 支付宝  │  │ 💬 微信支付│            │
│  └──────────┘  └──────────┘            │
│                                         │
│              [确认支付 →]                 │
└─────────────────────────────────────────┘
```

### 5.6 我的订单 `/orders`

**布局**：
```
┌─────────────────────────────────────────┐
│  我的订单                                │
├─────────────────────────────────────────┤
│  全部 | 待支付 | 待发货 | 待收货 | 已完成   │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐│
│  │ 订单号: 20260606001    待支付        ││
│  │ [图片] 龙井问茶 x1    ¥268.00      ││
│  │              [取消订单] [去支付 →]    ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ 订单号: 20260605003    已完成        ││
│  │ [图片] 武夷岩茶 x2    ¥396.00      ││
│  │              [申请退款] [去评价]      ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## 6. 订单状态机

与现有 Vue 项目保持一致：

```
待支付(0) → 已支付(1) → 已发货(2) → 已完成(3) → 已评价(4)
待支付(0) → 已取消(5)
已支付(1) → 退款申请中(6) → 已退款(7) / 已拒绝退款(8)
```

状态标签映射：

| 状态码 | 文字 | 颜色 |
|--------|------|------|
| 0 | 待支付 | `yellow` |
| 1 | 已支付 | `blue` |
| 2 | 已发货 | `purple` |
| 3 | 已完成 | `green` |
| 4 | 已评价 | `gray` |
| 5 | 已取消 | `gray` |
| 6 | 退款中 | `orange` |
| 7 | 已退款 | `red` |
| 8 | 已拒绝 | `red` |

## 7. 后端对接

### 7.1 环境变量

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
PROXY_TARGET_URL=http://localhost:8080
PROXY_ALLOWED_PREFIXES=/product,/cart,/order,/auth,/user,/store,/payment
```

### 7.2 需要对接的后端接口

| 模块 | 接口 | 方法 | 说明 |
|------|------|------|------|
| 认证 | `/auth/login` | POST | 登录 |
| 认证 | `/auth/register` | POST | 注册 |
| 商品 | `/product/list` | GET | 商品列表（支持分类、搜索、分页） |
| 商品 | `/product/detail` | GET | 商品详情 |
| 商品 | `/product/reviews` | GET | 商品评价 |
| 购物车 | `/cart/list` | GET | 购物车列表 |
| 购物车 | `/cart/add` | POST | 加入购物车 |
| 购物车 | `/cart/update` | POST | 更新数量 |
| 购物车 | `/cart/delete/{id}` | DELETE | 删除 |
| 订单 | `/order/create` | POST | 创建订单 |
| 订单 | `/order/list` | GET | 订单列表 |
| 订单 | `/order/detail` | GET | 订单详情 |
| 订单 | `/order/cancel/{id}` | POST | 取消订单 |
| 订单 | `/order/confirm/{id}` | POST | 确认收货 |
| 订单 | `/order/refund/{id}` | POST | 申请退款 |
| 订单 | `/order/review` | POST | 提交评价 |
| 订单 | `/order/logistics` | GET | 物流追踪 |
| 支付 | `/payment/alipay/pay` | POST | 支付宝支付 |
| 地址 | `/user/address/list` | GET | 地址列表 |
| 地址 | `/user/address/add` | POST | 新增地址 |
| 地址 | `/user/address/update` | POST | 编辑地址 |
| 地址 | `/user/address/delete/{id}` | DELETE | 删除地址 |
| 收藏 | `/user/favorites/check` | GET | 检查收藏 |
| 收藏 | `/user/favorites/add` | POST | 添加收藏 |
| 收藏 | `/user/favorites/remove` | POST | 取消收藏 |
| 店铺 | `/store/{id}` | GET | 店铺信息 |
| 用户 | `/user/info` | GET | 用户信息 |

### 7.3 统一响应格式

```typescript
interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

## 8. 实施计划概要

分 7 个阶段，由小到大递进：

| 阶段 | 内容 | 预计产出 |
|------|------|---------|
| 1 | 项目初始化 | Next.js 脚手架 + shadcn/ui + Tailwind + 目录结构 |
| 2 | 基础设施 | middleware.ts + API 代理 + 认证 store + 类型定义 |
| 3 | 布局与导航 | Header + Footer + 根布局 + 商城布局 |
| 4 | 商品列表页 | Server Component 数据获取 + 商品卡片 + 分类筛选 + 搜索 |
| 5 | 商品详情页 | 图片画廊 + 加入购物车 + 评价列表 |
| 6 | 购物车 + 结算 | 购物车管理 + 地址表单 + 创建订单 |
| 7 | 收银台 + 订单 | 支付流程 + 订单列表 + 状态管理 |

## 9. 与现有项目的关系

- **完全独立**：新项目在 `d:\software\cloudtea-next`，不修改现有 `d:\software\CloudTea` 的任何文件
- **共享后端**：两个前端项目对接同一个 Spring Boot 后端（localhost:8080）
- **API 兼容**：复用现有后端的所有接口，不需要后端改动
- **渐进迁移**：未来可以逐步将所有模块迁移到新前端，最终替换 Vue 版本
