"use client"

import Link from "next/link"
import { Package, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { useAuthStore } from "@/lib/store/auth-store"
import { useAuth } from "@/lib/hooks/use-auth"

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navLinks = [
  { label: "首页", href: "/" },
  { label: "茶友圈", href: "#" },
  { label: "关于我们", href: "#" },
]

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const isLogin = useAuthStore((s) => s.isLogin())
  const { logout } = useAuth()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>云栖茗茶</SheetTitle>
          <SheetDescription>导航菜单</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => onOpenChange(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-stone-200" />
          {isLogin ? (
            <>
              <Link
                href="/orders"
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                <Package className="size-4" />
                我的订单
              </Link>
              <button
                onClick={() => {
                  logout()
                  onOpenChange(false)
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="size-4" />
                退出登录
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => onOpenChange(false)} className="mt-2">
              <Button
                variant="default"
                className="w-full bg-stone-900 text-white hover:bg-stone-800"
              >
                登录
              </Button>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
