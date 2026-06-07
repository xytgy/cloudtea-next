"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { OrderCard } from "@/components/order/order-card"
import { EmptyState } from "@/components/shared/empty-state"
import { getOrderListApi, cancelOrderApi, refundOrderApi, confirmOrderApi, submitReviewApi } from "@/lib/api/orders"
import { toast } from "sonner"
import { Loader2, Star, PackageOpen } from "lucide-react"
import type { Order, OrderStatus } from "@/types/order"

const statusTabs = [
  { value: "all", label: "全部" },
  { value: "0", label: "待支付" },
  { value: "1", label: "已支付" },
  { value: "2", label: "已发货" },
  { value: "3", label: "已完成" },
]

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; action: string; orderId: string }>({
    open: false,
    action: "",
    orderId: "",
  })
  const [reviewDialog, setReviewDialog] = useState<{ open: boolean; orderId: string }>({
    open: false,
    orderId: "",
  })
  const [reviewForm, setReviewForm] = useState({ rating: 5, content: "" })

  const fetchOrders = useCallback(async (status?: string) => {
    setLoading(true)
    try {
      const params = status && status !== "all" ? { status: Number(status) as OrderStatus } : undefined
      const res = await getOrderListApi(params)
      if (res.code === 0 && res.data) {
        setOrders(res.data.list || [])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders(activeTab)
  }, [activeTab, fetchOrders])

  const handleAction = (action: string, orderId: string) => {
    switch (action) {
      case "pay":
        router.push(`/payment?orderId=${orderId}`)
        break
      case "cancel":
      case "refund":
        setConfirmDialog({ open: true, action, orderId })
        break
      case "confirm":
        handleConfirmReceive(orderId)
        break
      case "review":
        setReviewDialog({ open: true, orderId })
        setReviewForm({ rating: 5, content: "" })
        break
    }
  }

  const handleConfirmAction = async () => {
    const { action, orderId } = confirmDialog
    try {
      const res = action === "cancel" ? await cancelOrderApi(orderId) : await refundOrderApi(orderId)
      if (res.code === 0) {
        toast.success(action === "cancel" ? "订单已取消" : "退款申请已提交")
        fetchOrders(activeTab)
      }
    } finally {
      setConfirmDialog({ open: false, action: "", orderId: "" })
    }
  }

  const handleConfirmReceive = async (orderId: string) => {
    const res = await confirmOrderApi(orderId)
    if (res.code === 0) {
      toast.success("已确认收货")
      fetchOrders(activeTab)
    }
  }

  const handleSubmitReview = async () => {
    const res = await submitReviewApi({
      orderId: reviewDialog.orderId,
      rating: reviewForm.rating,
      content: reviewForm.content,
    })
    if (res.code === 0) {
      toast.success("评价已提交")
      setReviewDialog({ open: false, orderId: "" })
      fetchOrders(activeTab)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">我的订单</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList variant="line" className="w-full justify-start overflow-x-auto">
          {statusTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <EmptyState
              icon={<PackageOpen className="h-12 w-12" />}
              title="暂无订单"
              description="快去选购心仪的商品吧"
            />
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} onAction={handleAction} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.action === "cancel" ? "确认取消订单" : "确认申请退款"}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {confirmDialog.action === "cancel" ? "取消后订单将关闭，确定要取消吗？" : "退款申请提交后将由商家审核，确定要申请吗？"}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog({ open: false, action: "", orderId: "" })}>
              取消
            </Button>
            <Button onClick={handleConfirmAction}>确定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={reviewDialog.open} onOpenChange={(open) => setReviewDialog({ ...reviewDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>评价订单</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">评分</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className="p-0.5"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= reviewForm.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-stone-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <Textarea
              placeholder="分享你的使用体验..."
              value={reviewForm.content}
              onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialog({ open: false, orderId: "" })}>
              取消
            </Button>
            <Button onClick={handleSubmitReview}>提交评价</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
