"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface OrderStatusBadgeProps {
  status: number
  className?: string
}

const statusConfig: Record<number, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"; className?: string }> = {
  0: { label: "待支付", variant: "default", className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" },
  1: { label: "已支付", variant: "default", className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" },
  2: { label: "已发货", variant: "default", className: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" },
  3: { label: "已完成", variant: "default", className: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" },
  4: { label: "已评价", variant: "secondary" },
  5: { label: "已取消", variant: "secondary" },
  6: { label: "退款中", variant: "default", className: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" },
  7: { label: "已退款", variant: "destructive" },
  8: { label: "已拒绝", variant: "destructive" },
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = statusConfig[status] || { label: "未知", variant: "secondary" as const }

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  )
}
