"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface OrderStatusBadgeProps {
  status: number
  className?: string
}

const statusConfig: Record<number, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"; className?: string }> = {
  0: { label: "待支付", variant: "default", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80" },
  1: { label: "已支付", variant: "default", className: "bg-blue-100 text-blue-800 hover:bg-blue-100/80" },
  2: { label: "已发货", variant: "default", className: "bg-purple-100 text-purple-800 hover:bg-purple-100/80" },
  3: { label: "已完成", variant: "default", className: "bg-green-100 text-green-800 hover:bg-green-100/80" },
  4: { label: "已评价", variant: "secondary" },
  5: { label: "已取消", variant: "secondary" },
  6: { label: "退款中", variant: "default", className: "bg-orange-100 text-orange-800 hover:bg-orange-100/80" },
  7: { label: "已退款", variant: "destructive" },
  8: { label: "已拒绝", variant: "destructive" },
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = statusConfig[status] || { label: "未知", variant: "secondary" as const }

  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}
