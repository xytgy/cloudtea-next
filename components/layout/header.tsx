"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ShoppingCart,
  Menu,
  User,
  Package,
  LogOut,
  Heart,
  Headphones,
  Store,
  ShoppingBag,
  MessageSquare,
  Users,
  ClipboardCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useAuthStore } from "@/lib/store/auth-store"
import { useCartStore } from "@/lib/store/cart-store"
import { useAuth } from "@/lib/hooks/use-auth"
import { MobileNav } from "./mobile-nav"

const navLinks = [
  { label: "首页", href: "/products" },
  { label: "茶友圈", href: "/tea-circle" },
  { label: "关于我们", href: "/about" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isLogin = useAuthStore((s) => s.isLogin())
  const userInfo = useAuthStore((s) => s.userInfo)
  const totalCount = useCartStore((s) => s.totalCount())
  const { logout } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="text-lg font-bold text-stone-900">
          云栖茗茶
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <motion.div key={link.label} whileHover={{ y: -1 }}>
              <Link
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="size-5 text-stone-700" />
                {mounted && totalCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-medium text-white">
                    {totalCount > 99 ? "99+" : totalCount}
                  </span>
                )}
              </Button>
            </Link>
          </motion.div>

          {isLogin ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="rounded-full" />
                }
              >
                {userInfo?.avatar ? (
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.nickname}
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-full bg-stone-200">
                    <User className="size-4 text-stone-600" />
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-stone-900">
                    {userInfo?.nickname || userInfo?.username}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  render={
                    <Link href="/orders" className="flex items-center gap-2" />
                  }
                >
                  <Package className="size-4" />
                  我的订单
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={
                    <Link href="/me" className="flex items-center gap-2" />
                  }
                >
                  <User className="size-4" />
                  个人中心
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={
                    <Link href="/favorites" className="flex items-center gap-2" />
                  }
                >
                  <Heart className="size-4" />
                  我的收藏
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={
                    <Link href="/support" className="flex items-center gap-2" />
                  }
                >
                  <Headphones className="size-4" />
                  我的咨询
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {userInfo?.role === 1 && (
                  <>
                    <DropdownMenuItem
                      render={
                        <Link href="/merchant/goods" className="flex items-center gap-2" />
                      }
                    >
                      <Store className="size-4" />
                      商品管理
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={
                        <Link href="/merchant/orders" className="flex items-center gap-2" />
                      }
                    >
                      <ShoppingBag className="size-4" />
                      订单管理
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={
                        <Link href="/merchant/chat" className="flex items-center gap-2" />
                      }
                    >
                      <MessageSquare className="size-4" />
                      消息中心
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                {userInfo?.role === 2 && (
                  <>
                    <DropdownMenuItem
                      render={
                        <Link href="/admin/users" className="flex items-center gap-2" />
                      }
                    >
                      <Users className="size-4" />
                      用户管理
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={
                        <Link href="/admin/audit" className="flex items-center gap-2" />
                      }
                    >
                      <ClipboardCheck className="size-4" />
                      商品审核
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={
                        <Link href="/admin/feedback" className="flex items-center gap-2" />
                      }
                    >
                      <MessageSquare className="size-4" />
                      反馈管理
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  variant="destructive"
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-stone-900 text-white hover:bg-stone-800"
                >
                  登录
                </Button>
              </Link>
            </motion.div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="md:hidden" />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>云栖茗茶</SheetTitle>
              </SheetHeader>
              <MobileNav open={open} onOpenChange={setOpen} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
