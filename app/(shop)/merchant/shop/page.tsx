"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Store, Pencil, Save, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getShopInfoApi, updateShopInfoApi } from "@/lib/api/merchant"
import { toast } from "sonner"
import type { Shop } from "@/lib/mock/merchant"

const statusConfig = {
  active: { label: "营业中", className: "bg-green-100 text-green-800" },
  pending: { label: "审核中", className: "bg-amber-100 text-amber-800" },
  inactive: { label: "已关闭", className: "bg-stone-100 text-stone-600" },
}

export default function ShopInfoPage() {
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: "", description: "" })

  useEffect(() => {
    getShopInfoApi().then((res) => {
      if (res.code === 0 && res.data) {
        setShop(res.data)
        setForm({ name: res.data.name, description: res.data.description })
      }
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("店铺名称不能为空")
      return
    }
    setSaving(true)
    try {
      const res = await updateShopInfoApi(form)
      if (res.code === 0) {
        setShop(res.data)
        setEditing(false)
        toast.success("保存成功")
      }
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (shop) {
      setForm({ name: shop.name, description: shop.description })
    }
    setEditing(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
      </div>
    )
  }

  if (!shop) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Card className="mx-auto max-w-lg">
          <CardContent className="flex flex-col items-center py-10 text-center">
            <Store className="mb-4 h-12 w-12 text-stone-300" />
            <h2 className="mb-2 text-lg font-bold text-stone-900">尚未入驻</h2>
            <p className="mb-4 text-sm text-stone-500">请先完成商家入驻</p>
            <Button
              className="bg-stone-900 text-white hover:bg-stone-800"
              onClick={() => (window.location.href = "/merchant/register")}
            >
              去入驻
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const config = statusConfig[shop.status]

  return (
    <div className="container mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900">店铺信息</h1>
              <p className="text-sm text-stone-500">管理您的店铺基本信息</p>
            </div>
          </div>
          {!editing && (
            <Button
              variant="outline"
              onClick={() => setEditing(true)}
            >
              <Pencil className="mr-1.5 h-4 w-4" />
              编辑
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>基本信息</CardTitle>
              <Badge variant="default" className={config.className}>
                {config.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>店铺名称</Label>
              {editing ? (
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="请输入店铺名称"
                />
              ) : (
                <p className="text-sm text-stone-700">{shop.name}</p>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>店铺描述</Label>
              {editing ? (
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="请输入店铺描述"
                  rows={3}
                />
              ) : (
                <p className="text-sm text-stone-700">{shop.description || "暂无描述"}</p>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>营业执照</Label>
              <div className="overflow-hidden rounded-lg border border-stone-200">
                <div className="flex aspect-[3/2] items-center justify-center bg-stone-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shop.licenseUrl}
                    alt="营业执照"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              </div>
              <a
                href={shop.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700"
              >
                <ExternalLink className="h-3 w-3" />
                查看原图
              </a>
            </div>

            {editing && (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  取消
                </Button>
                <Button
                  className="flex-1 bg-stone-900 text-white hover:bg-stone-800"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-1.5 h-4 w-4" />
                  )}
                  保存
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
