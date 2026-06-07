"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  Search,
  Plus,
  Loader2,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { EmptyState } from "@/components/shared/empty-state"
import {
  getMerchantGoodsApi,
  updateGoodsStatusApi,
} from "@/lib/api/merchant"
import { toast } from "sonner"
import type { MerchantGoods, GoodsStatus } from "@/lib/mock/merchant"

const statusMap: Record<GoodsStatus, { label: string; className: string }> = {
  on_sale: { label: "上架中", className: "bg-green-100 text-green-800" },
  off_sale: { label: "已下架", className: "bg-stone-100 text-stone-600" },
  pending_review: { label: "待审核", className: "bg-amber-100 text-amber-800" },
}

const categories = ["绿茶", "红茶", "乌龙", "白茶", "普洱", "花茶"]

export default function MerchantGoodsPage() {
  const [goods, setGoods] = useState<MerchantGoods[]>([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [newGoods, setNewGoods] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  })

  const fetchGoods = useCallback(async (kw?: string) => {
    setLoading(true)
    try {
      const res = await getMerchantGoodsApi({ keyword: kw })
      if (res.code === 0 && res.data) {
        setGoods(res.data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGoods()
  }, [fetchGoods])

  const handleSearch = () => {
    fetchGoods(keyword)
  }

  const handleToggleStatus = async (item: MerchantGoods) => {
    const newStatus: GoodsStatus =
      item.status === "on_sale" ? "off_sale" : "on_sale"
    const res = await updateGoodsStatusApi({ id: item.id, status: newStatus })
    if (res.code === 0) {
      toast.success(newStatus === "on_sale" ? "已上架" : "已下架")
      fetchGoods(keyword)
    }
  }

  const handleAddGoods = () => {
    if (!newGoods.name.trim()) {
      toast.error("请输入商品名称")
      return
    }
    if (!newGoods.price || Number(newGoods.price) <= 0) {
      toast.error("请输入有效价格")
      return
    }
    if (!newGoods.stock || Number(newGoods.stock) < 0) {
      toast.error("请输入有效库存")
      return
    }
    if (!newGoods.category) {
      toast.error("请选择分类")
      return
    }
    toast.success("商品已提交审核")
    setAddDialogOpen(false)
    setNewGoods({ name: "", price: "", stock: "", category: "", description: "" })
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900">商品管理</h1>
              <p className="text-sm text-stone-500">共 {goods.length} 件商品</p>
            </div>
          </div>
          <Button
            className="bg-stone-900 text-white hover:bg-stone-800"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            发布新商品
          </Button>
        </div>

        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input
              placeholder="搜索商品名称..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-8"
            />
          </div>
          <Button variant="outline" onClick={handleSearch}>
            搜索
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
          </div>
        ) : goods.length === 0 ? (
          <EmptyState
            icon={<Package className="h-12 w-12" />}
            title="暂无商品"
            description="点击「发布新商品」添加第一件商品"
          />
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-stone-50/80">
                      <th className="px-4 py-3 font-medium text-stone-600">商品</th>
                      <th className="px-4 py-3 font-medium text-stone-600">价格</th>
                      <th className="hidden px-4 py-3 font-medium text-stone-600 sm:table-cell">库存</th>
                      <th className="hidden px-4 py-3 font-medium text-stone-600 sm:table-cell">销量</th>
                      <th className="px-4 py-3 font-medium text-stone-600">状态</th>
                      <th className="px-4 py-3 font-medium text-stone-600">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {goods.map((item, i) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b last:border-0"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-medium text-stone-900">{item.name}</p>
                                <p className="text-xs text-stone-500">{item.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium text-stone-900">¥{item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="ml-1 text-xs text-stone-400 line-through">
                                ¥{item.originalPrice}
                              </span>
                            )}
                          </td>
                          <td className="hidden px-4 py-3 text-stone-600 sm:table-cell">
                            {item.stock}
                          </td>
                          <td className="hidden px-4 py-3 text-stone-600 sm:table-cell">
                            {item.sales}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="default"
                              className={statusMap[item.status].className}
                            >
                              {statusMap[item.status].label}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            {item.status !== "pending_review" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleStatus(item)}
                              >
                                {item.status === "on_sale" ? (
                                  <>
                                    <EyeOff className="mr-1 h-3.5 w-3.5" />
                                    下架
                                  </>
                                ) : (
                                  <>
                                    <Eye className="mr-1 h-3.5 w-3.5" />
                                    上架
                                  </>
                                )}
                              </Button>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>发布新商品</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>商品名称</Label>
              <Input
                placeholder="请输入商品名称"
                value={newGoods.name}
                onChange={(e) => setNewGoods({ ...newGoods, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>价格</Label>
                <Input
                  type="number"
                  placeholder="¥"
                  value={newGoods.price}
                  onChange={(e) => setNewGoods({ ...newGoods, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>库存</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newGoods.stock}
                  onChange={(e) => setNewGoods({ ...newGoods, stock: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>分类</Label>
              <Select
                value={newGoods.category}
                onValueChange={(val) => setNewGoods({ ...newGoods, category: val ?? "" })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>商品描述</Label>
              <Textarea
                placeholder="请输入商品描述"
                value={newGoods.description}
                onChange={(e) =>
                  setNewGoods({ ...newGoods, description: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              className="bg-stone-900 text-white hover:bg-stone-800"
              onClick={handleAddGoods}
            >
              提交审核
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
