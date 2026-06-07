"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, MessageSquare, Plus, Send } from "lucide-react"
import { useAuthStore } from "@/lib/store/auth-store"
import { mockSupportList } from "@/lib/mock/user-center"
import type { SupportItem, SupportStatus } from "@/lib/mock/user-center"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { toast } from "sonner"

const statusTabs: { value: string; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "pending", label: "待回复" },
  { value: "replied", label: "已回复" },
  { value: "resolved", label: "已解决" },
]

const statusConfig: Record<
  SupportStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  pending: { label: "待回复", variant: "secondary" },
  replied: { label: "已回复", variant: "default" },
  resolved: { label: "已解决", variant: "outline" },
}

const categoryOptions = [
  "产品咨询",
  "冲泡方法",
  "茶叶保存",
  "物流配送",
  "售后服务",
]

export default function SupportPage() {
  const router = useRouter()
  const isLogin = useAuthStore((s) => s.isLogin)
  const [items, setItems] = useState<SupportItem[]>(mockSupportList)
  const [activeTab, setActiveTab] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    contact: "",
  })

  useEffect(() => {
    if (!isLogin()) {
      router.push("/login?redirect=/support")
    }
  }, [isLogin, router])

  const filtered =
    activeTab === "all"
      ? items
      : items.filter((item) => item.status === activeTab)

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim() || !form.category) {
      toast.error("请填写完整信息")
      return
    }
    const newItem: SupportItem = {
      id: `s${Date.now()}`,
      title: form.title,
      content: form.content,
      category: form.category,
      status: "pending",
      createdAt: new Date().toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    setItems((prev) => [newItem, ...prev])
    setDialogOpen(false)
    setForm({ title: "", category: "", content: "", contact: "" })
    toast.success("咨询已提交，我们会尽快回复")
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold text-stone-800">我的咨询</h1>
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-36 shrink-0 md:block">
          <nav className="space-y-1">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? "bg-stone-800 text-white"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {tab.label}
                <span className="ml-1 text-xs opacity-60">
                  {tab.value === "all"
                    ? items.length
                    : items.filter((i) => i.status === tab.value).length}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <div className="flex gap-2 overflow-x-auto">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeTab === tab.value
                      ? "bg-stone-800 text-white"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-1 h-4 w-4" />
              新建咨询
            </Button>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <MessageSquare className="mb-3 h-12 w-12 text-stone-300" />
              <p className="text-sm text-stone-500">暂无咨询记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-stone-800">
                          {item.title}
                        </h3>
                        <Badge variant={statusConfig[item.status].variant}>
                          {statusConfig[item.status].label}
                        </Badge>
                      </div>
                      <p className="mb-3 line-clamp-2 text-sm text-stone-500">
                        {item.content}
                      </p>
                      {item.reply && (
                        <div className="mb-3 rounded-lg bg-stone-50 p-3">
                          <p className="mb-1 text-xs font-medium text-stone-600">
                            商家回复
                          </p>
                          <p className="text-xs leading-relaxed text-stone-500">
                            {item.reply}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <span>{item.category}</span>
                        <span>·</span>
                        <span>{item.createdAt}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>新建咨询</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-stone-700">咨询标题</Label>
              <Input
                placeholder="请输入咨询标题"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="border-stone-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-stone-700">咨询分类</Label>
              <Select
                value={form.category}
                onValueChange={(value: string) =>
                  setForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-full border-stone-200">
                  <SelectValue placeholder="请选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-stone-700">咨询内容</Label>
              <Textarea
                placeholder="请详细描述您的问题..."
                rows={4}
                value={form.content}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, content: e.target.value }))
                }
                className="resize-none border-stone-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-stone-700">联系方式</Label>
              <Input
                placeholder="手机号或邮箱"
                value={form.contact}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, contact: e.target.value }))
                }
                className="border-stone-200"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              取消
            </Button>
            <Button onClick={handleSubmit}>
              <Send className="mr-1 h-4 w-4" />
              提交
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
