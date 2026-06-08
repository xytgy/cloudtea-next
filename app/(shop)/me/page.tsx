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
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="mb-6 overflow-hidden shadow-sm">
          <div className="h-28 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5" />
          <CardContent className="relative px-6 pb-6">
            <motion.button
              onClick={handleAvatarClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="-mt-12 relative block overflow-hidden rounded-full border-4 border-background ring-2 ring-primary/20 transition-all duration-200 hover:ring-primary/40"
            >
              <img
                src={profile.avatar}
                alt={profile.nickname}
                className="h-24 w-24 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                <Camera className="h-5 w-5 text-white" />
              </div>
            </motion.button>

            <div className="mt-4 flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {userInfo?.nickname || profile.nickname}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.signature}
                </p>
              </div>
              <Link href="/profile/edit">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Edit3 className="mr-1.5 h-4 w-4" />
                  编辑资料
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6 shadow-sm">
            <CardContent className="grid grid-cols-3 divide-x divide-border p-0">
              {[
                { label: "订单", value: profile.stats.orders },
                { label: "收藏", value: profile.stats.favorites },
                { label: "咨询", value: profile.stats.consultations },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex flex-col items-center py-6"
                >
                  <span className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 text-xs text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-sm">
            <CardContent className="divide-y divide-border p-0">
              {quickLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Link href={link.href}>
                    <div className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <link.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {link.label}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="my-8" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground"
        >
          CloudTea · 品味生活
        </motion.div>
      </motion.div>
    </div>
  )
}
