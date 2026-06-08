"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderStatusBadge } from "./order-status-badge"
import { ImageWithFallback } from "@/components/shared/image-with-fallback"
import { PriceDisplay } from "@/components/shared/price-display"
import type { Order, OrderStatus } from "@/types/order"

interface OrderCardProps {
  order: Order
  onAction: (action: string, orderId: string) => void
}

interface ActionButton {
  action: string
  label: string
  variant: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link"
}

const actionButtons: Record<number, ActionButton[]> = {
  0: [
    { action: "cancel", label: "取消订单", variant: "outline" },
    { action: "pay", label: "去支付", variant: "default" },
  ],
  1: [
    { action: "refund", label: "申请退款", variant: "outline" },
  ],
  2: [
    { action: "confirm", label: "确认收货", variant: "default" },
  ],
  3: [
    { action: "review", label: "去评价", variant: "default" },
  ],
}

export function OrderCard({ order, onAction }: OrderCardProps) {
  const buttons = actionButtons[order.status as number] || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">订单号</span>
            <span className="font-mono text-sm font-medium text-foreground">{order.orderNo}</span>
          </div>
          <OrderStatusBadge status={order.status} />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted/30">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground line-clamp-1">{item.name}</p>
                  {item.spec && (
                    <p className="mt-1 text-xs text-muted-foreground">{item.spec}</p>
                  )}
                </div>
                <div className="text-right">
                  <PriceDisplay price={item.price} size="sm" />
                  <p className="mt-1 text-xs text-muted-foreground">x{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件
            </span>
            <span className="text-sm font-semibold">
              合计：<PriceDisplay price={order.payAmount} size="md" className="inline-flex" />
            </span>
          </div>
          {buttons.length > 0 && (
            <div className="flex gap-2">
              {buttons.map((btn: ActionButton) => (
                <motion.div
                  key={btn.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={btn.variant}
                    size="sm"
                    onClick={() => onAction(btn.action, order.id)}
                    className="rounded-full px-4"
                  >
                    {btn.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
