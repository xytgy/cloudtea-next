"use client"

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">订单号：{order.orderNo}</span>
        </div>
        <OrderStatusBadge status={order.status} />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                {item.spec && (
                  <p className="text-xs text-muted-foreground">{item.spec}</p>
                )}
              </div>
              <div className="text-right">
                <PriceDisplay price={item.price} size="sm" />
                <p className="text-xs text-muted-foreground">x{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件</span>
          <span className="ml-4 text-sm font-medium">
            合计：<PriceDisplay price={order.payAmount} size="md" />
          </span>
        </div>
        {buttons.length > 0 && (
          <div className="flex gap-2">
            {buttons.map((btn: ActionButton) => (
              <Button
                key={btn.action}
                variant={btn.variant}
                size="sm"
                onClick={() => onAction(btn.action, order.id)}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
