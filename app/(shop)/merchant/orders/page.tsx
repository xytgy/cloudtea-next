"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ClipboardList,
  Loader2,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  MapPin,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { EmptyState } from "@/components/shared/empty-state"
import {
  getMerchantOrdersApi,
  shipOrderApi,
  handleRefundApi,
} from "@/lib/api/merchant"
import { toast } from "sonner"
import type { MerchantOrder } from "@/lib/mock/merchant"
import { ORDER_STATUS_MAP, type OrderStatus } from "@/types/order"

const merchantStatusTabs = [
  { value: "all", label: "全部" },
  { value: "1", label: "待发货" },
  { value: "2", label: "已发货" },
  { value: "6", label: "退款中" },
]

export default function MerchantOrdersPage() {
  const [orders, setOrders] = useState<MerchantOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [shipDialog, setShipDialog] = useState<{ open: boolean; orderId: string }>({
    open: false,
    orderId: "",
  })
  const [trackingNo, setTrackingNo] = useState("")
  const [refundDialog, setRefundDialog] = useState<{
    open: boolean
    orderId: string
  }>({ open: false, orderId: "" })
  const [refundReason, setRefundReason] = useState("")

  const fetchOrders = useCallback(async (status?: string) => {
    setLoading(true)
    try {
      const params = status && status !== "all" ? { status: Number(status) } : undefined
      const res = await getMerchantOrdersApi(params)
      if (res.code === 0 && res.data) {
        setOrders(res.data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders(activeTab)
  }, [activeTab, fetchOrders])

  const handleShip = async () => {
    if (!trackingNo.trim()) {
      toast.error("请输入快递单号")
      return
    }
    const res = await shipOrderApi({ orderId: shipDialog.orderId, trackingNo })
    if (res.code === 0) {
      toast.success("发货成功")
      setShipDialog({ open: false, orderId: "" })
      setTrackingNo("")
      fetchOrders(activeTab)
    }
  }

  const handleRefund = async (agree: boolean) => {
    const res = await handleRefundApi({
      orderId: refundDialog.orderId,
      agree,
      reason: agree ? undefined : refundReason,
    })
    if (res.code === 0) {
      toast.success(agree ? "已同意退款" : "已拒绝退款")
      setRefundDialog({ open: false, orderId: "" })
      setRefundReason("")
      fetchOrders(activeTab)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900">订单管理</h1>
            <p className="text-sm text-stone-500">处理买家订单</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList variant="line" className="w-full justify-start overflow-x-auto">
            {merchantStatusTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
              </div>
            ) : orders.length === 0 ? (
              <EmptyState
                icon={<ClipboardList className="h-12 w-12" />}
                title="暂无订单"
                description="当前筛选条件下没有订单"
              />
            ) : (
              <div className="space-y-3">
                {orders.map((order) => {
                  const isExpanded = expandedId === order.id
                  const statusInfo = ORDER_STATUS_MAP[order.status as OrderStatus] || {
                    label: "未知",
                    color: "bg-stone-100 text-stone-600",
                  }

                  return (
                    <Card key={order.id}>
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={order.buyerAvatar}
                                alt={order.buyerName}
                                className="h-8 w-8 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium text-stone-900">
                                  {order.buyerName}
                                </p>
                                <p className="text-xs text-stone-500">{order.orderNo}</p>
                              </div>
                            </div>
                            <Badge
                              variant="default"
                              className={statusInfo.color}
                            >
                              {statusInfo.label}
                            </Badge>
                          </div>

                          <div className="mb-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 py-1.5"
                              >
                                <div className="h-8 w-8 shrink-0 overflow-hidden rounded bg-stone-100">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-xs text-stone-700">
                                    {item.name} × {item.quantity}
                                  </p>
                                </div>
                                <span className="text-xs text-stone-500">
                                  ¥{item.price}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-stone-500">
                              <span>{order.createdAt}</span>
                              {order.trackingNo && (
                                <span className="text-stone-400">
                                  {order.trackingNo}
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-stone-900">
                              ¥{order.totalAmount}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            {order.status === 1 && (
                              <Button
                                size="sm"
                                className="bg-stone-900 text-white hover:bg-stone-800"
                                onClick={() =>
                                  setShipDialog({ open: true, orderId: order.id })
                                }
                              >
                                <Truck className="mr-1 h-3.5 w-3.5" />
                                发货
                              </Button>
                            )}
                            {order.status === 6 && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setRefundDialog({ open: true, orderId: order.id })
                                }
                              >
                                <RotateCcw className="mr-1 h-3.5 w-3.5" />
                                处理退款
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                setExpandedId(isExpanded ? null : order.id)
                              }
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="mr-1 h-3.5 w-3.5" />
                                  收起
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="mr-1 h-3.5 w-3.5" />
                                  详情
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <Separator />
                              <div className="space-y-3 bg-stone-50/50 p-4 text-sm">
                                <div className="flex items-start gap-2">
                                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                                  <div>
                                    <p className="font-medium text-stone-700">
                                      {order.address.name} {order.address.phone}
                                    </p>
                                    <p className="text-stone-500">
                                      {order.address.province}
                                      {order.address.city}
                                      {order.address.district}
                                      {order.address.detail}
                                    </p>
                                  </div>
                                </div>
                                <Separator />
                                <div>
                                  <p className="mb-1 font-medium text-stone-700">商品明细</p>
                                  {order.items.map((item) => (
                                    <div
                                      key={item.id}
                                      className="flex justify-between py-1 text-stone-500"
                                    >
                                      <span>
                                        {item.name}（{item.spec}）× {item.quantity}
                                      </span>
                                      <span>¥{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                  ))}
                                </div>
                                {order.payTime && (
                                  <p className="text-xs text-stone-400">
                                    支付时间：{order.payTime}
                                  </p>
                                )}
                                {order.shipTime && (
                                  <p className="text-xs text-stone-400">
                                    发货时间：{order.shipTime}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      <Dialog
        open={shipDialog.open}
        onOpenChange={(open) => {
          setShipDialog({ open, orderId: shipDialog.orderId })
          if (!open) setTrackingNo("")
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>填写快递单号</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>快递单号</Label>
              <Input
                placeholder="请输入快递单号"
                value={trackingNo}
                onChange={(e) => setTrackingNo(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShipDialog({ open: false, orderId: "" })
                setTrackingNo("")
              }}
            >
              取消
            </Button>
            <Button
              className="bg-stone-900 text-white hover:bg-stone-800"
              onClick={handleShip}
            >
              确认发货
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={refundDialog.open}
        onOpenChange={(open) => {
          setRefundDialog({ open, orderId: refundDialog.orderId })
          if (!open) setRefundReason("")
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>退款处理</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-stone-600">
              买家申请了退款，请选择处理方式
            </p>
            <div className="space-y-2">
              <Label>拒绝原因（同意退款可跳过）</Label>
              <Textarea
                placeholder="请输入拒绝原因"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleRefund(false)}
            >
              拒绝退款
            </Button>
            <Button
              className="flex-1 bg-stone-900 text-white hover:bg-stone-800"
              onClick={() => handleRefund(true)}
            >
              同意退款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
