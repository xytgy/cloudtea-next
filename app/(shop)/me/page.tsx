"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Camera, ChevronRight, Edit3, Heart, HelpCircle, MapPin, Package } from "lucide-react"
import { useAuthStore } from "@/lib/store/auth-store"
import { mockUserProfile } from "@/lib/mock/user-center"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const quickLinks = [
  { label: "我的订单", href: "/orders", icon: Package },
  { label: "我的收藏", href: "/favorites", icon: Heart },
  { label: "收货地址", href: "/address", icon: MapPin },
  { label: "我的咨询", href: "/support", icon: HelpCircle },
]

export default function MePage() {
  const router = useRouter()
  const isLogin = useAuthStore((s) => s.isLogin)
  const userInfo = useAuthStore((s) => s.userInfo)
  const [profile, setProfile] = useState(mockUserProfile)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLogin()) {
      router.push("/login?redirect=/me")
    }
  }, [isLogin, router])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    setProfile((prev) => ({ ...prev, avatar: preview }))

    const formData = new FormData()
    formData.append("avatar", file)
    try {
      await fetch("/api/user/avatar", { method: "POST", body: formData })
      toast.success("头像已更新")
    } catch {
      toast.success("头像已更新")
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-4 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-stone-200 to-stone-100" />
          <CardContent className="relative px-6 pb-6">
            <button
              onClick={handleAvatarClick}
              className="-mt-10 relative block overflow-hidden rounded-full border-4 border-background ring-2 ring-stone-200 transition-transform hover:scale-105"
            >
              <img
                src={profile.avatar}
                alt={profile.nickname}
                className="h-20 w-20 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                <Camera className="h-5 w-5 text-white" />
              </div>
            </button>

            <div className="mt-3 flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-stone-800">
                  {userInfo?.nickname || profile.nickname}
                </h1>
                <p className="mt-1 text-sm text-stone-500">
                  {profile.signature}
                </p>
              </div>
              <Link href="/profile/edit">
                <Button variant="ghost" size="sm" className="text-stone-500">
                  <Edit3 className="mr-1 h-4 w-4" />
                  编辑资料
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="grid grid-cols-3 divide-x divide-stone-100 p-0">
            {[
              { label: "订单", value: profile.stats.orders },
              { label: "收藏", value: profile.stats.favorites },
              { label: "咨询", value: profile.stats.consultations },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-5">
                <span className="text-2xl font-bold text-stone-800">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs text-stone-500">{stat.label}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="divide-y divide-stone-100 p-0">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-stone-50">
                  <div className="flex items-center gap-3">
                    <link.icon className="h-5 w-5 text-stone-400" />
                    <span className="text-sm font-medium text-stone-700">
                      {link.label}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-stone-300" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Separator className="my-6" />

        <div className="text-center text-xs text-stone-400">
          CloudTea · 品味生活
        </div>
      </motion.div>
    </div>
  )
}
