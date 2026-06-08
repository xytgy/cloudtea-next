# 云栖茗茶 UI 精修实施计划

> 日期：2026-06-08
> 方案：渐进式精修
> 目标：全面提升界面精致度，打造极简高级的电商体验

## 一、设计系统升级

### 1.1 配色方案升级

**目标**：在现有 Stone 中性色基础上，添加茶绿色品牌强调色

**修改文件**：`app/globals.css`

**具体变更**：
- 添加茶绿色 CSS 变量：`--accent-tea: oklch(0.55 0.12 155)` (对应 #5B8C5A)
- 更新 `--primary` 为茶绿色
- 更新 `--primary-foreground` 为白色
- 保持现有 Stone 色系作为中性色
- 添加茶绿色的浅色变体用于 hover、active 状态

### 1.2 排版层次优化

**目标**：增强文字层次对比，优化间距

**修改文件**：`app/globals.css`

**具体变更**：
- 优化标题字号对比（H1: 36px, H2: 28px, H3: 22px）
- 增加行高（正文 1.7，标题 1.3）
- 统一间距规范（8px 基础单位）
- 增强卡片阴影层次（默认 shadow-sm, hover shadow-md）

### 1.3 圆角与阴影规范

**目标**：统一视觉语言，增加精致感

**规范**：
- 卡片圆角：`rounded-xl` (12px)
- 按钮圆角：`rounded-lg` (8px)
- 输入框圆角：`rounded-lg` (8px)
- 图片圆角：`rounded-lg` (8px)
- 阴影层次：sm → md → lg 渐进

## 二、动效系统升级

### 2.1 入场动画系统

**目标**：页面加载时的优雅入场效果

**实现方案**：
- 创建 `AnimateOnScroll` 组件（基于 Framer Motion）
- 支持淡入、上移、缩放等动画类型
- 支持滚动触发（Intersection Observer）
- 支持错位动画（stagger）

**应用位置**：
- 首页 Hero 区域
- 商品网格
- 功能卡片
- 关于我们页面

### 2.2 微交互动效

**目标**：让每个操作都有细腻反馈

**具体变更**：

**按钮组件** (`components/ui/button.tsx`)：
- 添加 hover 时的轻微上移效果 (`translateY(-1px)`)
- 添加点击时的轻微下沉效果 (`translateY(1px)`)
- 添加 focus 状态的环形光晕

**卡片组件** (`components/ui/card.tsx`)：
- 添加 hover 时的阴影加深效果
- 添加 hover 时的轻微上移效果
- 优化过渡时间（150ms ease）

**商品卡片** (`components/product/product-card.tsx`)：
- 图片 hover 时的缩放效果（1.05）
- 添加购物车按钮的点击反馈
- 价格标签的微动效

**输入框组件** (`components/ui/input.tsx`)：
- 添加 focus 时的边框颜色过渡
- 添加 focus 时的轻微阴影

### 2.3 加载状态动画

**目标**：让等待更优雅

**具体变更**：

**骨架屏组件** (`components/ui/skeleton.tsx`)：
- 优化 pulse 动画的节奏
- 添加更真实的骨架形状

**按钮 Loading 状态**：
- 优化 Loader2 图标的旋转速度
- 添加文字淡入淡出效果

**页面 Loading**：
- 创建全局 Loading 组件
- 使用品牌色的加载动画

### 2.4 页面过渡动画

**目标**：平滑的页面切换体验

**实现方案**：
- 在 `(shop)/layout.tsx` 中添加 AnimatePresence
- 使用 framer-motion 的 layout 动画
- 优化 Tab 切换的过渡效果

## 三、组件优化

### 3.1 Header 组件优化

**文件**：`components/layout/header.tsx`

**具体变更**：
- 优化导航链接的 hover 效果（下划线动画）
- 优化购物车图标的角标动画
- 优化用户头像的 hover 效果
- 添加滚动时的背景模糊效果

### 3.2 商品卡片优化

**文件**：`components/product/product-card.tsx`

**具体变更**：
- 优化图片容器的比例和圆角
- 添加图片加载时的渐显效果
- 优化文字排版层次
- 添加"加入购物车"按钮的微动效

### 3.3 购物车组件优化

**文件**：`components/cart/cart-item.tsx`, `components/cart/cart-summary.tsx`

**具体变更**：
- 优化购物车项的布局和间距
- 添加删除时的滑出动画
- 优化数量选择器的交互
- 优化结算栏的视觉层次

### 3.4 订单组件优化

**文件**：`components/order/order-card.tsx`, `components/order/order-status-badge.tsx`

**具体变更**：
- 优化订单卡片的布局
- 优化状态标签的样式
- 添加操作按钮的微动效

### 3.5 空状态组件优化

**文件**：`components/shared/empty-state.tsx`

**具体变更**：
- 添加图标的微动效
- 优化文字排版
- 添加操作按钮的引导效果

## 四、页面级优化

### 4.1 首页优化

**文件**：`app/(shop)/products/page.tsx`

**具体变更**：
- 优化 Hero 区域的视觉效果
- 添加商品网格的入场动画
- 优化分类标签的交互效果
- 添加搜索框的 focus 效果

### 4.2 商品详情页优化

**文件**：`app/(shop)/products/[id]/page.tsx`

**具体变更**：
- 优化图片画廊的交互
- 添加规格选择的动效
- 优化价格展示的视觉层次
- 添加 Tab 切换的过渡效果

### 4.3 登录页优化

**文件**：`app/(auth)/login/page.tsx`

**具体变更**：
- 优化卡片的视觉效果
- 添加表单的入场动画
- 优化演示账号的交互效果
- 添加 Tab 切换的过渡效果

### 4.4 个人中心优化

**文件**：`app/(shop)/me/page.tsx`

**具体变更**：
- 优化头像区域的视觉效果
- 添加统计数据的入场动画
- 优化快捷链接的交互效果

## 五、实施顺序

### 阶段一：设计系统基础（优先级：高）
1. 更新 `globals.css` 的配色和排版规范
2. 优化基础 UI 组件（button, card, input）
3. 创建动画工具组件

### 阶段二：核心组件优化（优先级：高）
1. 优化 Header 组件
2. 优化商品卡片组件
3. 优化购物车组件
4. 优化订单组件

### 阶段三：页面级优化（优先级：中）
1. 优化首页
2. 优化商品详情页
3. 优化登录页
4. 优化个人中心

### 阶段四：细节打磨（优先级：低）
1. 优化空状态组件
2. 优化加载状态
3. 优化页面过渡
4. 整体测试和调整

## 六、验收标准

### 6.1 视觉验收
- [ ] 配色方案统一，茶绿色品牌色正确应用
- [ ] 排版层次清晰，字号对比明显
- [ ] 圆角和阴影规范统一
- [ ] 整体视觉精致度提升

### 6.2 动效验收
- [ ] 入场动画流畅自然
- [ ] 微交互动效细腻
- [ ] 加载状态优雅
- [ ] 页面过渡平滑

### 6.3 功能验收
- [ ] 所有原有功能正常
- [ ] 响应式布局正常
- [ ] 无性能问题
- [ ] 无控制台错误

## 七、风险评估

### 7.1 技术风险
- **低风险**：所有改动都是渐进式的，不涉及架构变更
- **低风险**：使用现有技术栈（Framer Motion, Tailwind CSS）
- **低风险**：不涉及数据层改动

### 7.2 时间风险
- **中风险**：动效调试可能需要多次迭代
- **低风险**：配色和排版改动相对直接

### 7.3 兼容性风险
- **低风险**：使用标准 CSS 和 Framer Motion，兼容性好
- **低风险**：不涉及新的依赖引入

## 八、技术栈确认

- **动画库**：Framer Motion（已安装）
- **样式**：Tailwind CSS 4（已安装）
- **UI 组件**：shadcn/ui + @base-ui/react（已安装）
- **图标**：Lucide React（已安装）
- **状态管理**：Zustand（已安装）
- **数据请求**：TanStack Query（已安装）

## 九、文件变更清单

### 新增文件
- `components/shared/animate-on-scroll.tsx` - 滚动动画组件
- `components/shared/page-transition.tsx` - 页面过渡组件

### 修改文件
- `app/globals.css` - 配色和排版规范
- `components/ui/button.tsx` - 按钮组件优化
- `components/ui/card.tsx` - 卡片组件优化
- `components/ui/input.tsx` - 输入框组件优化
- `components/ui/skeleton.tsx` - 骨架屏优化
- `components/layout/header.tsx` - Header 优化
- `components/product/product-card.tsx` - 商品卡片优化
- `components/cart/cart-item.tsx` - 购物车项优化
- `components/cart/cart-summary.tsx` - 购物车结算优化
- `components/order/order-card.tsx` - 订单卡片优化
- `components/order/order-status-badge.tsx` - 状态标签优化
- `components/shared/empty-state.tsx` - 空状态优化
- `app/(shop)/products/page.tsx` - 首页优化
- `app/(shop)/products/[id]/page.tsx` - 商品详情页优化
- `app/(auth)/login/page.tsx` - 登录页优化
- `app/(shop)/me/page.tsx` - 个人中心优化
- `app/(shop)/layout.tsx` - 添加页面过渡

## 十、测试计划

### 10.1 功能测试
- 登录/注册流程
- 商品浏览和搜索
- 购物车操作
- 订单流程
- 个人中心功能

### 10.2 视觉测试
- 不同屏幕尺寸的响应式表现
- 不同浏览器的兼容性
- 动效的流畅度

### 10.3 性能测试
- 页面加载速度
- 动画性能
- 内存使用

---

**计划状态**：待用户确认
**预计工作量**：中等（2-3天）
**优先级**：高
