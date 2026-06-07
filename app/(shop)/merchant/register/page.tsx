"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Store, FileImage, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { getShopInfoApi, registerShopApi } from "@/lib/api/merchant"
import { toast } from "sonner"
import type { Shop } from "@/lib/mock/merchant"

export default function MerchantRegisterPage() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: "", licenseUrl: "", description: "" })

  useEffect(() => {
    getShopInfoApi().then((res) => {
      if (res.code === 0 && res.data) {
        setShop(res.data)
      }
      setLoading(false)
    })
  }, [])

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error("请输入店铺名称")
      return
    }
    if (!form.licenseUrl.trim()) {
      toast.error("请输入营业执照链接")
      return
    }
    setSubmitting(true)
    try {
      const res = await registerShopApi(form)
      if (res.code === 0) {
        toast.success("入驻申请已提交")
        setShop(res.data)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
      </div>
    )
  }

  if (shop?.status === "active") {
    return (
      <div className="container mx-auto py-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg"
        >
          <Card>
            <CardContent className="flex flex-col items-center py-10 text-center">
              <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
              <h2 className="mb-2 text-xl font-bold text-stone-900">已入驻</h2>
              <p className="mb-4 text-sm text-stone-500">
                您的店铺 <span className="font-medium text-stone-700">{shop.name}</span> 已通过审核
              </p>
              <Badge variant="default" className="bg-green-100 text-green-800">
                营业中
              </Badge>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => (window.location.href = "/merchant/shop")}
              >
                查看店铺信息
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (shop?.status === "pending") {
    return (
      <div className="container mx-auto py-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg"
        >
          <Card>
            <CardContent className="flex flex-col items-center py-10 text-center">
              <Loader2 className="mb-4 h-16 w-16 text-amber-500" />
              <h2 className="mb-2 text-xl font-bold text-stone-900">审核中</h2>
              <p className="mb-4 text-sm text-stone-500">
                您的入驻申请正在审核中，请耐心等待
              </p>
              <Badge variant="default" className="bg-amber-100 text-amber-800">
                待审核
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900">商家入驻</h1>
            <p className="text-sm text-stone-500">填写店铺信息开始经营</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>店铺信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>店铺名称</Label>
              <Input
                placeholder="请输入店铺名称"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>营业执照链接</Label>
              <Input
                placeholder="请输入营业执照图片链接"
                value={form.licenseUrl}
                onChange={(e) => setForm({ ...form, licenseUrl: e.target.value })}
              />
              {form.licenseUrl && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden rounded-lg border border-stone-200"
                >
                  <div className="flex aspect-[3/2] items-center justify-center bg-stone-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.licenseUrl}
                      alt="营业执照预览"
                      className="h-full w-full object-contain p-2"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = "none"
                        ;(e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden")
                      }}
                    />
                    <div className="hidden flex-col items-center gap-2 text-stone-400">
                      <FileImage className="h-8 w-8" />
                      <span className="text-xs">图片预览</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-2">
              <Label>店铺描述</Label>
              <Textarea
                placeholder="请简要描述您的店铺和主营商品"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            <Button
              className="w-full bg-stone-900 text-white hover:bg-stone-800"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              提交入驻申请
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
