"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CartSummaryProps {
  checkedItems: { length: number }
  checkedTotal: number
  onCheckout: () => void
  className?: string
}

export function CartSummary({
  checkedItems,
  checkedTotal,
  onCheckout,
  className,
}: CartSummaryProps) {
  const itemCount = checkedItems.length
  const hasItems = itemCount > 0

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 border-t bg-background p-4 md:sticky md:bottom-auto md:left-auto md:right-auto md:rounded-lg md:border md:p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            已选 <span className="font-medium text-foreground">{itemCount}</span> 件
          </p>
          <p className="text-lg font-semibold">
            合计：<span className="text-destructive">¥{checkedTotal.toFixed(2)}</span>
          </p>
        </div>
        <Button
          size="lg"
          disabled={!hasItems}
          onClick={onCheckout}
        >
          去结算
        </Button>
      </div>
    </div>
  )
}
