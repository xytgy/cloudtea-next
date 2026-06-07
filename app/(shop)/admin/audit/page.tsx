"use client"

import { useEffect, useState, useCallback } from "react"
import { Loader2, CheckCircle, XCircle, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { getAuditGoodsApi, auditGoodsApi } from "@/lib/api/admin"
import { toast } from "sonner"
import type { AuditGoods } from "@/lib/mock/admin"

export default function AdminAuditPage() {
  const [goods, setGoods] = useState<AuditGoods[]>([])
  const [loading, setLoading] = useState(true)
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; id: string; name: string }>({
    open: false,
    id: "",
    name: "",
  })
  const [rejectReason, setRejectReason] = useState("")

  const fetchGoods = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAuditGoodsApi()
      if (res.code === 0) setGoods(res.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGoods()
  }, [fetchGoods])

  const handleApprove = async (item: AuditGoods) => {
    const res = await auditGoodsApi({ id: item.id, status: "approved" })
    if (res.code === 0) {
      toast.success(`「${item.name}」已审核通过`)
      fetchGoods()
    }
  }

  const handleReject = async () => {
    const res = await auditGoodsApi({
      id: rejectDialog.id,
      status: "rejected",
      reason: rejectReason,
    })
    if (res.code === 0) {
      toast.success("已驳回")
      setRejectDialog({ open: false, id: "", name: "" })
      setRejectReason("")
      fetchGoods()
    }
  }

  const openRejectDialog = (item: AuditGoods) => {
    setRejectDialog({ open: true, id: item.id, name: item.name })
    setRejectReason("")
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">商品审核</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          审核商家提交的商品信息，通过后商品将上架展示
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : goods.length === 0 ? (
        <EmptyState
          icon={<PackageOpen className="size-12" />}
          title="暂无待审核商品"
          description="所有商品已审核完毕"
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {goods.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <Badge
                  variant="outline"
                  className="absolute top-2 left-2 bg-amber-100 text-amber-700 border-amber-200"
                >
                  待审核
                </Badge>
              </div>
              <CardContent className="space-y-3 p-4">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-lg font-semibold text-stone-900 mt-1">
                    ¥{item.price}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>商家：{item.merchant}</span>
                  <span>{item.submittedAt}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    className="flex-1"
                    onClick={() => handleApprove(item)}
                  >
                    <CheckCircle className="mr-1 size-4" />
                    通过
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => openRejectDialog(item)}
                  >
                    <XCircle className="mr-1 size-4" />
                    驳回
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={rejectDialog.open}
        onOpenChange={(open) =>
          setRejectDialog({ ...rejectDialog, open })
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>驳回商品</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              确定要驳回「{rejectDialog.name}」吗？请填写驳回原因：
            </p>
            <Textarea
              placeholder="请输入驳回原因..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialog({ open: false, id: "", name: "" })}
            >
              取消
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              确认驳回
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
