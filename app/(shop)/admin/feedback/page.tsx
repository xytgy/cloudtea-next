"use client"

import { useEffect, useState, useCallback } from "react"
import { Loader2, MessageSquare, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { getFeedbackListApi, updateFeedbackStatusApi } from "@/lib/api/admin"
import { toast } from "sonner"
import type { FeedbackItem, FeedbackStatus } from "@/lib/mock/admin"

const statusLabel: Record<FeedbackStatus, string> = {
  pending: "待处理",
  processed: "已处理",
  ignored: "已忽略",
}

const statusBadgeClass: Record<FeedbackStatus, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  processed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  ignored: "bg-stone-100 text-stone-500 border-stone-200",
}

const filterTabs: { value: string; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "pending", label: "待处理" },
  { value: "processed", label: "已处理" },
  { value: "ignored", label: "已忽略" },
]

export default function AdminFeedbackPage() {
  const [allFeedback, setAllFeedback] = useState<FeedbackItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [detailDialog, setDetailDialog] = useState<{ open: boolean; item: FeedbackItem | null }>({
    open: false,
    item: null,
  })

  const fetchFeedback = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getFeedbackListApi()
      if (res.code === 0) setAllFeedback(res.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFeedback()
  }, [fetchFeedback])

  const filteredFeedback = filter === "all"
    ? allFeedback
    : allFeedback.filter((f) => f.status === filter)

  const handleMarkProcessed = async (id: string) => {
    const res = await updateFeedbackStatusApi({ id, status: "processed" })
    if (res.code === 0) {
      toast.success("已标记为已处理")
      setDetailDialog({ open: false, item: null })
      fetchFeedback()
    }
  }

  const handleIgnore = async (id: string) => {
    const res = await updateFeedbackStatusApi({ id, status: "ignored" })
    if (res.code === 0) {
      toast.success("已忽略")
      setDetailDialog({ open: false, item: null })
      fetchFeedback()
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">反馈管理</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          查看和处理用户反馈，提升服务体验
        </p>
      </div>

      <div className="mb-6 flex items-center gap-2">
        {filterTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={filter === tab.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(tab.value)}
            className={filter === tab.value ? "bg-stone-900 text-white hover:bg-stone-800" : ""}
          >
            {tab.label}
            {tab.value !== "all" && (
              <Badge variant="outline" className="ml-1.5 bg-white/20 text-xs">
                {allFeedback.filter((f) => f.status === tab.value).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : filteredFeedback.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="size-12" />}
          title="暂无反馈"
          description="当前筛选条件下没有反馈记录"
        />
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">用户名</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">反馈类型</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">内容预览</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">状态</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">提交时间</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedback.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{item.username}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{item.type}</Badge>
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-muted-foreground">
                      {item.content}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={statusBadgeClass[item.status]}
                      >
                        {statusLabel[item.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDetailDialog({ open: true, item })}
                        >
                          详情
                        </Button>
                        {item.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkProcessed(item.id)}
                          >
                            <CheckCheck className="mr-1 size-3.5" />
                            处理
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog
        open={detailDialog.open}
        onOpenChange={(open) => setDetailDialog({ ...detailDialog, open })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>反馈详情</DialogTitle>
          </DialogHeader>
          {detailDialog.item && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">用户名：</span>
                  <span className="font-medium">{detailDialog.item.username}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">类型：</span>
                  <Badge variant="outline">{detailDialog.item.type}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">状态：</span>
                  <Badge
                    variant="outline"
                    className={statusBadgeClass[detailDialog.item.status]}
                  >
                    {statusLabel[detailDialog.item.status]}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">时间：</span>
                  <span>{detailDialog.item.createdAt}</span>
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm leading-relaxed">{detailDialog.item.content}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            {detailDialog.item?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() =>
                    detailDialog.item && handleIgnore(detailDialog.item.id)
                  }
                >
                  忽略
                </Button>
                <Button onClick={() => detailDialog.item && handleMarkProcessed(detailDialog.item.id)}>
                  标记已处理
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
