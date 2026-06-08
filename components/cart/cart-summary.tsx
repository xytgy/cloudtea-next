"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ShoppingBag } from "lucide-react"

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn(
        "fixed bottom-0 left-0 right-0 border-t bg-background/95 p-4 backdrop-blur-md md:sticky md:bottom-auto md:left-auto md:right-auto md:rounded-xl md:border md:p-6 md:shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            已选 <span className="font-semibold text-foreground">{itemCount}</span> 件商品
          </p>
          <p className="mt-1 text-xl font-bold">
            合计：<span className="text-primary">¥{checkedTotal.toFixed(2)}</span>
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            disabled={!hasItems}
            onClick={onCheckout}
            className="gap-2 rounded-full px-8 shadow-sm hover:shadow-md"
          >
            <ShoppingBag className="h-4 w-4" />
            去结算
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
